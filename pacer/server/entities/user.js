const utility = require('../utility/sha512');

class User {
  static tableName = 'user';
  static className = 'User';

  constructor(responseObject) {
    if (!responseObject) {
      return null;
    }
    this.id = responseObject.id;
    this.email = responseObject.email;
    this.passwordHash = responseObject.password_hash;
    this.salt = responseObject.salt;
    this.nickname = responseObject.nickname;
    this.age = responseObject.age;
    this.about = responseObject.about;
    this.imageUrl = responseObject.image_url ? responseObject.image_url : "http://localhost:3000/images/notFound.jpg";
    this.isOnline = responseObject.is_online === true;
    this.latitude = responseObject.latitude;
    this.longitude = responseObject.longitude;
    this.roleId = responseObject.role_id;
  }

  static getCreateSql() {
    return `INSERT INTO ${this.tableName} (
              email,
              password_hash,
              salt,
              nickname,
              age,
              about,
              latitude,
              longitude)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  }

  static getCreatePlaceholdersArray(userData) {
    const passwordData = utility.sha512(userData.password,
      utility.genRandomString(256));
    return [
      userData.email,
      passwordData.passwordHash,
      passwordData.salt,
      userData.nickname,
      userData.age,
      userData.about,
      userData.latitude,
      userData.longitude
    ];
  }

  static getUpdateSql() {
    return `UPDATE ${this.tableName} SET
              email = ?,
              password_hash = ?,
              nickname = ?,
              age = ?,
              about = ?,
              image_url = ?,
              latitude = ?,
              longitude = ?
             WHERE id = ?`;
  }

  static getUpdatePlaceholdersArray(user, oldUser) {
    const passwordData = utility.sha512(user.password, oldUser.salt);
    return [
      user.email,
      passwordData.passwordHash,
      user.nickname,
      user.age,
      user.about,
      user.imageUrl,
      user.latitude,
      user.longitude,
      user.id
    ];
  }
}

module.exports = User;
