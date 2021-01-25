const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const client = require("../models");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const accessTokenSecret = process.env.SECRET_KEY;
const tokenForUser = async function (id) {
  try {
    let accessToken = jwt.sign(
      { user: { id } },
      accessTokenSecret,
      {
        expiresIn: "3h",
      }
    );
    console.log(accessToken)
    return accessToken;
  } catch (error) {
    console.error(error);
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
          
          res.json({ token: token});
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
      return res.send({ token: accessToken });
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
  // logOut: async (req, res) => {
  //   const query = "DELETE FROM refreshtoken WHERE token = ?"
  //   console.log(req.body.refreshToken)
  //   try{
  //     await client.Client.query(query, [req.body.refreshToken], (err, result) => {
  //       if (err) throw err

  //       res.json({status: "success"})
  //     })
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
};
