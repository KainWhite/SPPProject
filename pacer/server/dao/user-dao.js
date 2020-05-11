const GenericDao = require('./generic-dao');
const UserSettingsDAO = require('./user-settings-dao');
const User = require('../entities/user');

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class UserDAO extends GenericDao {
  static entityClass = User;

  static async getByEmail(userEmail) {
    const sql = `SELECT * FROM ${this.entityClass.tableName} WHERE email = ?`;
    const rows = await this.connection.query(sql, [userEmail]);
    return new User(rows[0]);
  }

  static async create(userData) {
    if (!validateEmail(userData.email)) {
      return {error: "Invalid email provided."};
    }
    if (userData.password.length < 8) {
      return {error: "Password is too short (8 characters min)."};
    }
    if (userData.password !== userData.confirmPassword) {
      return {error: "Passwords do not match."};
    }
    if (userData.age <= 0) {
      return {error: "Invalid age."};
    }

    return super.create(userData);
  }

  static async update(user) {
    if (!validateEmail(user.email)) {
      return {error: "Invalid email provided."};
    }
    if (user.password && user.password.length < 8) {
      return {error: "Password is too short (8 characters min)."};
    }
    if (user.password && user.password !== user.confirmPassword) {
      return {error: "Passwords do not match."};
    }
    if (user.age <= 0) {
      return {error: "Invalid age."};
    }

    return super.update(user);
  }

  static async updateAvatar(id, imageUrl) {
      const sql = `UPDATE ${this.entityClass.tableName} SET
                     image_url = ?
                   WHERE id = ${this.connection.escape(id)}`;
      await this.connection.query(sql, [imageUrl, id]);
      return await this.getById(id);
  }

  static async getNearby(latitude, longitude, searchRadius) {
    console.log(searchRadius);
    const kmPerDeg = 111.225; // km
    const earthRad = 6371; // km
    const sql = `
      SELECT latitude, longitude, id, nickname, age, about, image_url, distance
      FROM (
        SELECT latitude, longitude, id, nickname, age, about, image_url,
          ${earthRad} * ATAN(
            SQRT(
              POWER(
                COS(RADIANS(latitude)) *
                SIN(ABS(RADIANS(${longitude}) - RADIANS(longitude))),
                2
              ) +
              POWER(
                COS(RADIANS(${latitude})) * SIN(RADIANS(latitude)) -
                SIN(RADIANS(${latitude})) * COS(RADIANS(latitude)) *
                  COS(ABS(RADIANS(${longitude}) - RADIANS(longitude))),
                2
              )
            ) / (
              SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude)) +
              COS(RADIANS(${latitude})) * COS(RADIANS(latitude)) *
                COS(ABS(RADIANS(${longitude}) - RADIANS(longitude)))
            )
          ) AS distance
        FROM ${this.entityClass.tableName}
        WHERE latitude
          BETWEEN ${latitude} - (${searchRadius} / ${kmPerDeg})
              AND ${latitude} + (${searchRadius} / ${kmPerDeg})
          AND longitude
          BETWEEN ${longitude} - (${searchRadius} / (${kmPerDeg} * COS(RADIANS(${latitude}))))
              AND ${longitude} + (${searchRadius} / (${kmPerDeg} * COS(RADIANS(${latitude}))))
      ) AS d
      WHERE distance <= ${searchRadius}
    `;
    const rows = await this.connection.query(sql);
    return rows.map(row => new this.entityClass(row));
  }

  static async updateStatus(userId, isOnline) {
    const sql = `UPDATE ${this.entityClass.tableName} SET
                     is_online = ${isOnline}
                   WHERE id = ${userId}`;
    await this.connection.query(sql, []);
    return await this.getById(userId);
  }
}

module.exports = UserDAO;
