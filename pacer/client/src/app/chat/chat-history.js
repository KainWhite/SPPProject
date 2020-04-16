import React from 'react';
import {ChatMessage} from './chat-message';
import {ChatProfile} from "./chat-profile";

class ChatHistory extends React.Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({  });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    loadHistory = () => {
        let history = [];
        //temp
        let i = 0;
        for (let msg of this.props.history) {
            history.push(
                <ChatMessage message={msg.text} by={msg.author} key={i++}/>
            );
        }

        return history;
    }

    render() {
        return (
            <div className="chat__history">
                <div className="chat__history-user">
                    <div>
                        <i className="fas fa-arrow-left" onClick={this.props.onBackClick()}/>
                    </div>
                    {/*<ChatProfile imgUrl={this.props.user.imgUrl} nickname={this.props.user.nickname}*/}
                    {/*             msgTime={this.props.user.msgTime}/>*/}
                    {/*<p>{this.props.user.status}</p>*/}
                </div>
                {this.loadHistory()}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }
}

export {ChatHistory}