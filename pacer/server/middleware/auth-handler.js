const jwt = require('jwt-simple');
const config = require('../appConfig.json')

const UsersDAO = require('../dao/users');
const usersDAO = new UsersDAO();

function handleAuth(req, res, next) {
    // URLs available for everyone
    if (req.url == "/login" || req.url == '/users/create' || req.url.indexOf("/images") == 0) {
      return next();
    }
  
    if (!req.headers['x-auth']) {return res.json({error: "Not authorised."})}
      try {
        var email = jwt.decode(req.headers['x-auth'], config.secretKey).email;
      } 
      catch(err) {return res.json({error: "Invalid token."})}
  
      usersDAO.getByEmail(email, (err, user) => {
        if (err) {return res.json({error: "Invalid token."})}
        req.user = user;
        next();
      })
}

module.exports = handleAuth;