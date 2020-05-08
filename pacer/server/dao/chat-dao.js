const GenericDao = require('./generic-dao');
const Chat = require('../entities/chat');

class ChatDAO extends GenericDao {
    static entityClass = Chat;

    static async getAllByOwner(userId) {
        const sql = `SELECT * FROM ${this.entityClass.tableName} WHERE user1_id = ? OR user2_id = ?`;
        const rows = await this.connection.query(sql, [userId, userId]);
        return rows.length > 0 ? rows.map(row => new Chat(row)) : {error: `No chats for user available`};
    }


    static async getByUsers(user1Id, user2Id) {
        const sql = `SELECT * FROM ${this.entityClass.tableName} WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)`;
        const rows = await this.connection.query(sql, [user1Id, user2Id, user2Id, user1Id]);
        return rows.length > 0 ? new Chat(rows[0]) : {error: `Chat not found`};
    }
}

module.exports = ChatDAO;
