import React from 'react';
import {ChatProfile} from "./chat-profile";

class ChatUsers extends React.Component {

    formatTime = (time) => {
        if(time) {
            let date = new Date(time);
            if (date.getDay() === new Date().getDay()) {
                return date.getHours() + ':' + date.getMinutes();
            }
            if (date.getDay() === new Date(new Date().setDate(new Date().getDate() - 1)).getDay()) {
                return 'yesterday';
            }
            return 'days';
        } else return '';
    };

    render() {
        return (
            <div className="chat__users">
                {this.props.users.map((user, idx) => {
                    return (
                        <ChatProfile imgUrl={user.imageUrl} nickname={user.nickname}
                                     key={user.id}
                                     lastMessage={this.props.messages[idx].text}
                                     msgTime={this.formatTime(this.props.messages[idx].dateTime)}
                                     user={user}
                                     onUserClick={this.props.onUserClick} chatId={this.props.chats[idx].id}/>
                    );
                })}
            </div>
        );
    }
}

export {ChatUsers}