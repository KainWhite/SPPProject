const GenericDao = require('./generic-dao');
const UserSettings = require('../entities/user-settings')

class UserSettingsDAO extends GenericDao {
  static entityClass = UserSettings;
  static async getByUser(user) {
    const sql = `SELECT * FROM ${this.entityClass.tableName}
                 WHERE user_id = ?`;
    const rows = await this.connection.query(sql, [user.id]);
    return new UserSettings(rows[0]);
  }
}

module.exports = UserSettingsDAO;
