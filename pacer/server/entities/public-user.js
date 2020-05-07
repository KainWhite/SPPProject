const User = require('./user');

class PublicUser {
    constructor(user) {
      this.id = user.id;
      this.email = user.email;
      this.nickname = user.nickname;
      this.age = user.age;
      this.about = user.about;
      this.imageUrl = user.imageUrl;
      this.isOnline = user.isOnline;
      this.latitude = user.latitude;
      this.longitude = user.longitude;
      this.roleId = user.roleId;
    }
}

module.exports = PublicUser;