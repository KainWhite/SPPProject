class User {
    constructor(responceObject) {
        this.id = responceObject.ID_User;
        this.email = responceObject.Email;
        this.passwordHash = responceObject.PasswordHash;
        this.salt = responceObject.Salt;
        this.nickname = responceObject.Nickname;
        this.age = responceObject.Age;
        this.about = responceObject.About;
        this.imageUrl = responceObject.ImageUrl;
        this.isOnline = responceObject.IsOnline;
        this.latitude = responceObject.Latitude;
        this.longitude = responceObject.Longitude;
        this.idRole = responceObject.ID_UserRole;
    }
}

module.exports = User;