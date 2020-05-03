class User {
    constructor(responseObject) {
        this.id = responseObject.id;
        this.email = responseObject.email;
        this.passwordHash = responseObject.password_hash;
        this.salt = responseObject.salt;
        this.nickname = responseObject.nickname;
        this.age = responseObject.age;
        this.about = responseObject.about;
        this.imageUrl = responseObject.image_url ? responseObject.image_url : "http://localhost:3000/images/notFound.jpg";
        this.isOnline = responseObject.is_online[0] == true;
        this.latitude = responseObject.latitude;
        this.longitude = responseObject.longitude;
        this.roleId = responseObject.role_id;
    }
}

module.exports = User;
