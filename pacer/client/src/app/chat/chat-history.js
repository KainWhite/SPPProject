import React from 'react';
import {ChatMessage} from './chat-message';
import {ChatProfile} from "./chat-profile";
import {RoundImage} from "../common-components/roundImage";

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
                    <i className="fas fa-arrow-left chat__history-arrow" onClick={this.props.onBackClick()}/>
                    <div className='chat__history-profile'>
                        <h1 className="chat__history-nickname">{this.props.user.nickname}</h1>
                        <span className='chat__history-status'>{this.props.user.status}</span>
                    </div>
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