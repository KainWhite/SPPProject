const mysql = require('mysql');
const util = require('util');
const config = require('../app-config.json');

class GenericDao {
  static connection;

  static establishConnection() {
    const connection = mysql.createConnection(config.DB);
    this.connection = {
      connect: util.promisify(connection.connect).bind(connection),
      query: util.promisify(connection.query).bind(connection),
      close: util.promisify(connection.end).bind(connection),
      escape: connection.escape.bind(connection),
    };
    this.connection.connect();
  }

  static async getAll() {
    const sql = `SELECT * FROM ${this.entityClass.tableName}`;
    const rows = await this.connection.query(sql);
    return rows.map(row => new this.entityClass(row));
  }

  static async getById(id) {
    const sql = `SELECT * FROM ${this.entityClass.tableName} WHERE id = ?`;
    const rows = await this.connection.query(sql, [id]);
    return new this.entityClass(rows[0]);
  }

  static async create(entityData) {
    const sql = this.entityClass.getCreateSql();
    const row = await this.connection.query(sql,
        this.entityClass.getCreatePlaceholdersArray(entityData));
    return new this.entityClass(row);
  }

  static async update(entity) {
    const oldEntity = await this.getById(entity.id);
    if (!oldEntity) {
      return {error: `Entity ${this.entityClass.className} with
                      id = ${entity.id} doesn't exist!`};
    }
    const updateEntity = {
      ...oldEntity,
      ...entity,
    };
    const sql = this.entityClass.getUpdateSql();
    await this.connection.query(sql,
        this.entityClass.getUpdatePlaceholdersArray(updateEntity));
    return await this.getById(entity.id);
  }
}

module.exports = GenericDao;
