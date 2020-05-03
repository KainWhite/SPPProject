class User {
    constructor(responseObject) {
        this.id = responseObject.ID_User;
        this.email = responseObject.Email;
        this.passwordHash = responseObject.PasswordHash;
        this.salt = responseObject.Salt;
        this.nickname = responseObject.Nickname;
        this.age = responseObject.Age;
        this.about = responseObject.About;
        this.imageUrl = responseObject.ImageUrl;
        this.isOnline = responseObject.IsOnline[0] === true;
        this.latitude = responseObject.Latitude;
        this.longitude = responseObject.Longitude;
        this.idRole = responseObject.ID_UserRole;
    }
}

module.exports = User;
