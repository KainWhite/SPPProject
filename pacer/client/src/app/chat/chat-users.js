import React from 'react';
import {ChatProfile} from "./chat-profile";

class ChatUsers extends React.Component {
    loadUsers = () => {
        let users = [];
        //temp
        let i = 0;
        for (let user of this.props.users) {
            users.push(
                <ChatProfile imgUrl={user.imgUrl} nickname={user.nickname}
                             key={i++} lastMessage={user.lastMessage} msgTime={user.msgTime} onClick={this.props.onUserClick}/>
            );
        }

        return users;
    };

    render() {
        return (
            <div className="chat__users">
                {this.loadUsers()}
            </div>
        );
    }
}

export {ChatUsers}