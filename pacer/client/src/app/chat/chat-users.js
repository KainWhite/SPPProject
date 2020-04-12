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
                <ChatProfile imgUrl={user.imgUrl} nickname={user.nickname}
                             key={user.nickname} lastMessage={user.lastMessage} msgTime={user.msgTime}/>
            );
        }

        return users;
    };

    render() {
        return (
            <div className="chat__users">
                {/*<div className='chat__users-header'>*/}
                {/*    <h1 className='chat__users-title'>Chats</h1>*/}
                {/*</div>*/}
                {this.loadUsers()}
            </div>
        );
    }
}

export {ChatUsers}