var mysql = require('mysql')
var crypto = require('crypto');
const User = require('../entities/user');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

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
                host: 'localhost',
                user: 'root',
                password: 'roottoor',
                database: 'mydb'
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
            console.log("ASDASD");
            if (err) { 
                callback(err, undefined);
                return;
            }
            callback(err, result.insertId);
        })
    }
}

module.exports = UsersDAO;