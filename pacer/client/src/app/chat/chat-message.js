import React from 'react';

class ChatMessage extends React.Component {

    render() {
        return (
            <div className={["chat__history-message", 'chat__history-msg-' + this.props.by].join(' ')}>
                <p className='chat__history-msg-text'>{this.props.message}</p>
            </div>
        );
    }
}

export {ChatMessage}