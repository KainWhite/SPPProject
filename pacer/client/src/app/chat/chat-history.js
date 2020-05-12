import React from 'react';
import {ChatMessage} from './chat-message';

class ChatHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messageText: ''
        };
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({});
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate(props, state, snapshot) {
        if(this.props.user !== props.user) {
            this.scrollToBottom();
            this.setState({
                messageText: '',
            })
        }
    }

    handleChange = (event) => {
        this.setState({messageText: event.target.value});
    }

    handleSubmit = (event) => {
        this.props.onMessageSend(this.state.messageText);
        event.preventDefault();
    }

    render() {
        return (
            <div className="chat__history">
                <div className="chat__history-user">
                    <i className="fas fa-arrow-left chat__history-arrow" onClick={this.props.onBackClick()}/>
                    <div className='chat__history-profile'>
                        <h1 className="chat__history-nickname">{this.props.user.nickname}</h1>
                        <span className='chat__history-status'>{this.props.user.status ? "online" : "offline"}</span>
                    </div>
                </div>
                <div className="chat__history-content">
                    {this.props.history.map(msg => {
                        return (
                            <ChatMessage message={msg.text} by={msg.author} key={msg.id}/>
                        );
                    })}
                    <div style={{float: "left", clear: "both"}}
                         ref={(el) => {
                             this.messagesEnd = el;
                         }}>
                    </div>
                </div>
                <form className="chat__history-form" onSubmit={this.handleSubmit}>
                    <input className="chat__history-input" type="text" placeholder="Enter your message..."
                           maxLength="4096" value={this.state.messageText} onChange={this.handleChange}/>
                    <button type="submit" className="chat__history-button">
                        <i className="fas fa-chevron-circle-right"/>
                    </button>
                </form>
            </div>
        );
    }
}

export {ChatHistory}