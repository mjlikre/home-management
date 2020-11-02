
const jwt     = require('jwt-simple');
const config  = require('../config');
const uuid = require("uuid")
const client = require('../models')
const bcrypt = require('bcryptjs');
const secret = require("./../config")
require('dotenv').config()
const tokenForUser = function(id) {
  const timestamp = new Date().getTime();
  // Sub === subject
  // iat === issued at time

  // Its going to encode the whole 1st object and then add our secret to it
  return jwt.encode({ sub: id, iat: timestamp}, config.SECRET_KEY);
};


module.exports = {
  signUp: async (req, res) => {
    if (req.body.secret !== process.env.SIGN_UP_KEY ){
      return res.status(401).json({error: "secret key is wrong"})
    }
    let { password, email } = req.body;
    if(!email || !password) {
      return res.status(422).json({ error: 'You must provide an username and password' });
    }
    try {
      // Check if theres existing user
      
      await client.Client.query(`SELECT * FROM auth WHERE email = ?`, [email], function (err, result) {
        if (err) console.log(err);
        else if(result.length > 0){ 
          return res.status(422).json({ error: 'Username is in user' });
        }
      })
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      
      password = hash;
      const id = uuid.v4()
      const query = "INSERT INTO auth SET ?"
      await client.Client.query(query, { user_id: id, email: email, pass: password, house_id : req.body.houseid, user_name: req.body.username}, (err, result) => {
        if (err) console.log(err);
        console.log(result)
        res.json({ token: tokenForUser(id)});
      })

     
    } catch(e) {
      console.log(e, "Something went wrong, contact Michael Jiang")
      res.status(500).json({ e });
    }

  },
  signIn: async (req, res) => {
    console.log("i'm seding stuff back")
    res.send({ token: tokenForUser(req.user[0].user_id)});

  },
  passwordChange: async(req, res) => {
    try{
      console.log(req.user[0].user_id)
      const id = req.user[0].user_id
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(req.body.newpass, salt);
      const password = hash;
      const query = "UPDATE auth SET pass = ? WHERE user_id = ?"
      await client.Client.query(
        query,
        [password, id],
        (err, result) => {
          if (err) console.log(err)
          res.json({data: result})
        }
      )
    }catch(e) {
      console.log(e)
    }
  },
  
};