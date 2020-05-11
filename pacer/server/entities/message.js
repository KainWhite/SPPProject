class Message {
    static tableName = 'message';
    static className = 'Message';

    constructor(responseObject) {
        if (!responseObject) {
            return null;
        }
        this.id = responseObject.id;
        this.chatId = responseObject.chat_id;
        this.userSenderId = responseObject.user_sender_id;
        this.text = responseObject.text;
        this.dateTime = responseObject.datetime
    }

    static getCreateSql() {
        return `INSERT INTO ${this.tableName} (
              chat_id,
              user_sender_id,
              text,
              datetime)
             VALUES (?, ?, ?, ?)`;
    }

    static getCreatePlaceholdersArray(messageData) {
        return [
            messageData.chatId,
            messageData.userSenderId,
            messageData.text,
            messageData.dateTime
        ];
    }

    static getUpdateSql() {
        return `UPDATE ${this.tableName} SET
              text = ?,
             WHERE id = ?`;
    }

    static getUpdatePlaceholdersArray(messageData, oldMessageData) {
        return [
            messageData.text,
            messageData.id
        ];
    }
}

module.exports = Message;
