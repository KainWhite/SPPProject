import React from 'react';

import {ModalWindow} from '../common-components/modalWindow';
import {ChatUsers} from './chat-users';
import {ChatHistory} from './chat-history';

import "./css/chat.scss"

class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    users = [
        {
            nickname: 'Daniil Yaskevich',
            imgUrl: 'https://i.pinimg.com/originals/4e/73/20/4e73208be9f326816a787de2e04db80a.jpg',
            lastMessage: 'Some text message',
            msgTime: '1:10 PM',
        },
        {
            nickname: 'Nikita Bitkin',
            imgUrl: 'https://i.pinimg.com/originals/4e/73/20/4e73208be9f326816a787de2e04db80a.jpg',
            lastMessage: 'Some text message',
            msgTime: '1:10 PM',
        },
        {
            nickname: 'Anton Kimaev',
            imgUrl: 'https://i.pinimg.com/originals/4e/73/20/4e73208be9f326816a787de2e04db80a.jpg',
            lastMessage: 'Some text message',
            msgTime: '1:10 PM',
        },
        {
            nickname: 'Anton Kimaev',
            imgUrl: 'https://i.pinimg.com/originals/4e/73/20/4e73208be9f326816a787de2e04db80a.jpg',
            lastMessage: 'Some text message',
            msgTime: '1:10 PM',
        },
        {
            nickname: 'Anton Kimaev',
            imgUrl: 'https://i.pinimg.com/originals/4e/73/20/4e73208be9f326816a787de2e04db80a.jpg',
            lastMessage: 'Some text message',
            msgTime: '1:10 PM',
        },
        {
            nickname: 'Anton Kimaev',
            imgUrl: 'https://i.pinimg.com/originals/4e/73/20/4e73208be9f326816a787de2e04db80a.jpg',
            lastMessage: 'Some text message',
            msgTime: '1:10 PM',
        },
    ];

    history = [
        {
            text: 'first message',
            author: 'left',
        },
        {
            text: 'second message',
            author: 'right',
        },
        {
            text: 'second message',
            author: 'right',
        },
        {
            text: 'second message',
            author: 'right',
        },
        {
            text: 'second message',
            author: 'right',
        },
        {
            text: 'second message',
            author: 'right',
        },
        {
            text: 'second message',
            author: 'right',
        },
        {
            text: 'second message',
            author: 'right',
        },
        {
            text: 'second message',
            author: 'right',
        },
        {
            text: 'second message',
            author: 'right',
        },
        {
            text: 'second message',
            author: 'right',
        },
        {
            text: 'second message',
            author: 'right',
        },
    ];

    render() {
        return (
            <ModalWindow onClose={this.props.onClose}>
                {/* temp users for now. they should come from caller */}
                <div className="chat__screen">
                    <ChatUsers users={this.users}/>
                    <ChatHistory history={this.history}/>
                </div>
            </ModalWindow>
        );
    }
}

export {ChatScreen}