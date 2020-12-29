const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const client = require("../models");
const bcrypt = require("bcryptjs");
const { token } = require("morgan");
require("dotenv").config();
const accessTokenSecret = process.env.SECRET_KEY;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const tokenForUser = async function (id) {
  try {
    let accessToken = jwt.sign(
      { user: { id } },
      accessTokenSecret,
      {
        expiresIn: "60h",
      }
    );
    console.log(accessToken)
    return accessToken;
  } catch (error) {
    console.error(error);
    return;
  }
  // try {
  //   let
  // }
  // const timestamp = new Date().getTime();
  // // Sub === subject
  // // iat === issued at time
  // // Its going to encode the whole 1st object and then add our secret to it
  // return jwt.encode({ sub: id, iat: timestamp}, process.env.SECRET_KEY);
};
const createRefreshToken = async function (id) {
  try {
    let refreshToken = jwt.sign(
      { user: { id } },
      refreshTokenSecret,
      {
        expiresIn: "24h",
      }
    );
    await client.Client.query("INSERT INTO refreshtoken SET ?", {token: refreshToken}, (err, result) => {
      if (err) throw err;
    })
    return refreshToken;
  } catch (err) {
    console.error(err);
    return;
  }
};

module.exports = {
  signUp: async (req, res) => {
    if (req.body.secret !== process.env.SIGN_UP_KEY) {
      return res.status(401).json({ error: "secret key is wrong" });
    }
    let { password, email } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "You must provide an username and password" });
    }
    try {
      await client.Client.query(
        `SELECT * FROM auth WHERE email = ?`,
        [email],
        function (err, result) {
          if (err) console.log(err);
          else if (result.length > 0) {
            return res.status(422).json({ error: "Username is in user" });
          }
        }
      );
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      password = hash;
      const id = uuid.v4();
      const query = "INSERT INTO auth SET ?";
      await client.Client.query(
        query,
        {
          user_id: id,
          email: email,
          pass: password,
          house_id: req.body.houseid,
          user_name: req.body.username,
        },
        (err, result) => {
          if (err) console.log(err);
          let token = tokenForUser(id)
          let refreshToken = createRefreshToken(id)
          
          res.json({ token: token, refreshToken: refreshToken });
        }
      );
    } catch (e) {
      console.log(e, "Something went wrong, contact Michael Jiang");
      res.status(500).json({ e });
    }
  },
  signIn: async (req, res) => {
    try{
      let accessToken = await tokenForUser(req.user[0].user_id)
      let refreshToken = await createRefreshToken(req.user[0].user_id) 
      return res.send({ token: accessToken, refreshToken: refreshToken});
    }catch(e) {
      return res.status(500).json({ e });
    }
  },
  passwordChange: async (req, res) => {
    try {
      const id = req.user[0].user_id;
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(req.body.newpass, salt);
      const password = hash;
      const query = "UPDATE auth SET pass = ? WHERE user_id = ?";
      await client.Client.query(query, [password, id], (err, result) => {
        if (err) console.log(err);
        res.json({ data: result });
      });
    } catch (e) {
      console.log(e);
    }
  },
  logOut: async (req, res) => {
    const query = "DELETE FROM refreshtoken WHERE token = ?"
    console.log(req.body.refreshToken)
    try{
      await client.Client.query(query, [req.body.refreshToken], (err, result) => {
        if (err) throw err

        res.json({status: "success"})
      })
    }catch(err){
      console.log(err)
    }
  },
  refreshAccessToken: async (req, res) => {
    try {
      //get refreshToken
      const { refreshToken } = req.body;
      //send error if no refreshToken is sent
      console.log(refreshToken)
      if (!refreshToken) {
        return res.status(403).json({ error: "Access denied,token missing!" });
      } else {
        //query for the token to check if it is valid:
        let tokenDoc = await client.Client.query("SELECT * FROM refreshtoken WHERE token = ?", [refreshToken], (err, result) => {
          if (err) throw err;
          return result
        })
        //send error if no token found:
        if (!tokenDoc) {
          return res.status(401).json({ error: "Token expired!" });
        } else {
          //extract payload from refresh token and generate a new access token and send it
          const payload = jwt.verify(tokenDoc.values[0], process.env.REFRESH_TOKEN_SECRET);
          const accessToken = jwt.sign({ user: payload }, process.env.SECRET_KEY, {
            expiresIn: "60m",
          });
          return res.status(200).json({ accessToken });
        }
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ error: "Invalid" });
      } else {
        //catch other unprecedented errors
        console.error(error);
        return res.status(400).json({ error });
      }
    }

  }
};
