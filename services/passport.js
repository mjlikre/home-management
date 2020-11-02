const passport      = require('passport');
const User          = require('../models/Client');
const config        = require('../config');
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt        = require('bcryptjs');
const jwt = require('jwt-simple')


const localOptions = { usernameField: 'username' };

let userID = ""

const localLogin = new LocalStrategy(localOptions, async (username, password, done) => {
  console.log("local")
  try {
    await User.query(`SELECT * FROM auth WHERE email = ?`, [username], async (err, user) => {
      if (err) throw err; 
      else if(user.length === 0){ 
        return done(null, false);
      }
      const isMatch = await bcrypt.compare(password, user[0].pass)
      if (isMatch){
        console.log("matched", user)
        return done(null, user);
      }else{

        return done(null, false);
      }      
    })
  }catch(e){

      done(e, false);
  }
});





const jwtOptions = {

  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.SECRET_KEY

};


const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // const decoded = jwt.decode(ExtractJwt.fromHeader("authotization"), config.SECRET_KEY)
  // console.log(decoded)
  try {
    if(payload.sub) {
      // userID = payload.sub.rows[0].id
      
      done(null, payload.sub);
    } else {
      console.log("failed", payload)
      done(null, false);
    }
  } catch(e) {
    done(e, false);
    console.log(e)
  }
});




// const saveUser = async (email, accessToken) => {
//   let duplicateUser=[] ;
//   const user = {email, accessToken};
//   const ID = userID
//   console.log(ID, "this is id")
//   console.log(user.email, "this is email")
//   console.log(user.accessToken, "this is token")

  

//   try {
//       const existingUser = await User.query("SELECT * FROM calendar_access_tokens WHERE id = $1", [ID])
//       if (existingUser.rowCount.length !== 0){
//           duplicateUser =  existingUser.rows
//       }
//       if (duplicateUser.length === 0 && user.accessToken !== accessToken)  {
//           // console.log('The user exists and db token expired', duplicateUser);
//           user.accessToken = accessToken;
//       }
//       else if (duplicateUser.length !== 0) {
//           const new_user = await User.query(`INSERT INTO calendar_access_tokens (user_id, email, access_token) VALUES($1, $2, $3)`, [ID, user.email, user.accessToken])
//           console.log(new_user)
//       }
//   } catch (e) {
//       throw e
//   }
//   // check if user exist, don't save it

  
// };

passport.use(localLogin);
passport.use(jwtLogin);