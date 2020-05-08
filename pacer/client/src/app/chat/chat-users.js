import React from 'react';
import {ChatProfile} from "./chat-profile";

class ChatUsers extends React.Component {
    render() {
        return (
            <div className="chat__users">
                {this.props.users.map(user => {
                    return (
                        <ChatProfile imgUrl={user.imgUrl} nickname={user.nickname}
                                     key={user.id} lastMessage="lastMessage" msgTime="time" user={user} onUserClick={this.props.onUserClick}/>
                    );
                })}
            </div>
        );
    }
}

export {ChatUsers}