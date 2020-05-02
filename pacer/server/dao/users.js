var mysql = require('mysql')
const User = require('../entities/user');
const utility = require('../utility/sha512');
const sha512 = utility.sha512;
const genRandomString = utility.genRandomString;

var config = require('../appConfig.json')

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

let instance = null;

class UsersDAO {
    constructor() {
        if (!instance) {
            instance = this;

            this.connection = mysql.createConnection({
                host: config.DB.host,
                user: config.DB.user,
                password: config.DB.password,
                database: config.DB.database
            })
            this.connection.connect()
        }

        return instance;
    }

    getAll(callback) {
        let sql = 'select * from users';
        this.connection.query(sql, function (err, rows, fields) {
            callback(err, err ? undefined : rows.map((obj) => new User(obj)));
        })
    }

    getById(userId, callback) {
        const sql = 'select * from users where ID_User = ' + this.connection.escape(userId);
        
        this.connection.query(sql, function (err, result) {
            const user = err || (result.length == 0) ? undefined : new User(result[0]);
            callback(err, user);
        })
    }

    getByEmail(userEmail, callback) {
        const sql = 'select * from users where Email = ' + this.connection.escape(userEmail);
        
        this.connection.query(sql, function (err, result) {
            const user = (err || (result.length == 0)) ? undefined : new User(result[0]);
            callback(err, user);
        })
    }

    // returns newely created object's id on success
    create(userData, callback) {
        const sql =   'insert into users (`Email`, `PasswordHash`, `Salt`, `Nickname`, `Age`, `About`, `Latitude`, `Longitude`) VALUES' 
                    + '(?, ?, ?, ?, ?, ?, ?, ?)';
        
        if (!validateEmail(userData.email)) {
            callback("Invalid email provided.", undefined);
            return;
        }

        if (userData.password.length < 8) {
            callback("Password is too short (8 characters min).", undefined);
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            callback("Passwords do not match.", undefined);
            return;
        }

        if (userData.age <= 0) {
            callback("Invalid age.", undefined);
            return;
        }
        
        var passwordData = sha512(userData.password, genRandomString(256));

        this.connection.query(sql, [  userData.email
                                    , passwordData.passwordHash
                                    , passwordData.salt
                                    , userData.nickname
                                    , userData.age
                                    , userData.about
                                    , userData.latitude
                                    , userData.longitude], function (err, result) {
            if (err) { 
                callback(err.sqlMessage, undefined);
                return;
            }
            callback(undefined, result.insertId);
        })
    }

    // same, returns id of updated user
    update(user, callback) {
        const sql = 'update users set `Email` = ?, `PasswordHash` = ?, `Nickname` = ?, `Age` = ?, ' +
                    '`About` = ?, `ImageUrl` = ?, `IsOnline` = ?, `Latitude` = ?, `Longitude` = ? where `ID_User` = ' + this.connection.escape(user.id);
        
        // Check user for existance
        this.getById(user.id, (_, oldUser) => {
            if (oldUser == undefined) {
                callback("User doesn't exist!");
                return;
            }

            if (!validateEmail(user.email)) {
                callback("Invalid email provided.");
                return;
            }
    
            if (user.password.length < 8) {
                callback("Password is too short (8 characters min).");
                return;
            }
    
            if (user.password !== user.confirmPassword) {
                callback("Passwords do not match.");
                return;
            }
    
            if (user.age <= 0) {
                callback("Invalid age.");
                return;
            }
            
            var passwordData = sha512(user.password, oldUser.salt);
    
            this.connection.query(sql, [  user.email
                                        , passwordData.passwordHash
                                        , user.nickname
                                        , user.age
                                        , user.about
                                        , user.imageUrl
                                        , user.isOnline
                                        , user.latitude
                                        , user.longitude], function (err, result) {
                if (err) { 
                    callback(err.sqlMessage);
                    return;
                }
                callback(undefined);
            })
        });
    }
}

module.exports = UsersDAO;