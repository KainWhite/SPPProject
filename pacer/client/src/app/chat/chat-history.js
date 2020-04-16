import React from 'react';
import {ChatMessage} from './chat-message';

class ChatHistory extends React.Component {
    constructor(props) {
        super(props);
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({  });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
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
                {this.loadHistory()}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }
}

export {ChatHistory}