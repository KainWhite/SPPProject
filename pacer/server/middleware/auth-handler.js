const jwt = require('jwt-simple');
const config = require('../app-config.json')

const UserDAO = require('../dao/user-dao');

async function handleAuth(req, res, next) {
  // URLs available for everyone
  if (req.url === "/login" ||
      req.url === '/users/create' ||
      req.url.indexOf("/images") === 0) {
    return next();
  }

  if (!req.headers['x-auth']) {
    return res.json({error: "Not authorised."});
  }

  let email;
  try {
    email = jwt.decode(req.headers['x-auth'], config.secretKey).email;
  } catch(err) {
    return res.json({error: "Invalid token."});
  }

  const user = await UserDAO.getByEmail(email);
  if (!user) {
    return res.json({error: "Invalid token."});
  }
  req.user = user;
  next();
}

module.exports = handleAuth;
