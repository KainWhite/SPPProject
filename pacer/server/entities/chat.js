class Chat {
    static tableName = 'chat';
    static className = 'Chat';

    constructor(responseObject) {
        if (!responseObject) {
            return null;
        }
        this.id = responseObject.id;
        this.user1Id = responseObject.user1Id;
        this.user2Id = responseObject.user2Id;
    }

    static getCreateSql() {
        return `INSERT INTO ${this.tableName} (
              user1_id,
              user2_id)
             VALUES (?, ?)`;
    }

    static getCreatePlaceholdersArray(chatData) {
        return [
            chatData.user1Id,
            chatData.user2Id
        ];
    }
}

module.exports = Chat;