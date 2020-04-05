import React from 'react';
import {ChatProfile} from "./chat-profile";

class ChatUsers extends React.Component {
    constructor(props) {
        super(props);
    }

    loadUsers = () => {
        let users = [];

        for (let user of this.props.users) {
            users.push(
                <ChatProfile imgUrl={user.imgUrl} nickname={user.nickname} key={user.nickname}/>
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