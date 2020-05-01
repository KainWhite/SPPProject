const UsersDAO = require('../dao/users');
const usersDAO = new UsersDAO();
var jwt = require('jwt-simple')
const sha512 = require('../utility/sha512').sha512;

var config = require('../appConfig.json')

var express = require('express');
var router = express.Router();
const bodyparser = require('body-parser');
router.use(bodyparser.json());
 
router.post ('/', function(req, res, next){
    if (!req.body.email || !req.body.password) {
        return res.json({error: "Not enough data provided."})
    } else {
        var email = req.body.email;
        var password = req.body.password;
        usersDAO.getByEmail(email, (err, user) => {
            if (err) {
                return res.json({error: "Such user doesn't exist."});
            }
            
            hash = sha512(password, user.salt)
            if (hash.passwordHash == user.passwordHash) {
                // success
                var token = jwt.encode({email: email}, config.secretKey)
                res.json({token: token})
            }
            else {
                return res.json({error: "Invalid password."});
            }
        })
    } 
})

module.exports = router;