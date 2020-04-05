import React from 'react';
import {ChatMessage} from './chat-message';

class ChatHistory extends React.Component {
    constructor(props) {
        super(props);
    }

    loadHistory = () => {
        let history = [];

        for (let msg of this.props.history) {
            history.push(
                <ChatMessage message={msg.text} by={msg.author} key={msg}/>
            );
        }

        return history;
    }

    render() {
        return (
            <div className="chat__history">
                {this.loadHistory()}
            </div>
        );
    }
}

export {ChatHistory}