import React from 'react';

import {RoundImage} from '../common-components/roundImage';

class ChatProfile extends React.Component {
    render() {
        return (
            <div className='chat__users-profile' onClick={() => this.props.onUserClick(this.props.user)}>
                <div className='chat__users-img-container'>
                    <RoundImage className='chat__users-image' imgUrl={this.props.imgUrl} alt="User avatar"/>
                </div>
                <div className='chat__users-content'>
                    <h1 className="chat__users-nickname">{this.props.nickname}</h1>
                    <span className='chat__users-last-message'>{this.props.lastMessage}</span>
                </div>
                <div className='chat__users-metrics'>
                    <span className='chat__users-time'>{this.props.msgTime}</span>
                    <span className='chat__users-received'>1</span>
                </div>
            </div>
        );
    }
}

export {ChatProfile}