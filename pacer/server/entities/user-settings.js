class UserSettings {
  static tableName = 'user_settings';
  static connectedTables = {
    user: {
      name: 'user',
      attribute: 'user_id',
      connectedAttribute: 'id',
    },
  };
  static className = 'UserSettings';

  constructor(responseObject) {
    if (!responseObject) {
      return null;
    }
    this.id = responseObject.id;
    this.userId = responseObject.user_id;
    this.searchRadius = responseObject.search_radius;
  }

  static getCreateSql() {
    return `INSERT INTO ${this.tableName} (
              user_id
              search_radius)
            VALUES (?, ?)`;
  }

  static getCreatePlaceholdersArray(userSettingsData) {
    return [
      userSettingsData.userId,
      userSettingsData.searchRadius,
    ];
  }

  static getUpdateSql() {
    return `UPDATE ${this.tableName} SET
              search_radius = ?
            WHERE id = ?`;
  }

  static getUpdatePlaceholdersArray(userSettings, oldUserSettings) {
    return [
      userSettings.searchRadius,

      userSettings.id
    ];
  }
}

module.exports = UserSettings;
