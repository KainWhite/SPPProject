const GenericDao = require('./generic-dao');
const Message = require('../entities/message');

class MessageDao extends GenericDao {
    static entityClass = Message;

    static async getByChat(chatId) {
        const sql = `SELECT * FROM ${this.entityClass.tableName} WHERE chat_id = ? ORDER BY datetime`;
        const rows = await this.connection.query(sql, [chatId]);
        return rows.length > 0 ? rows.map(row => new Message(row)) : {error: `Chat is clear`};
    }
}

module.exports = MessageDao;
