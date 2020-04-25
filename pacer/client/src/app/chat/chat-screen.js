import React from 'react';

import {ModalWindow} from '../common-components/modalWindow';
import {ChatUsers} from './chat-users';
import {ChatHistory} from './chat-history';

import "./css/chat.scss"

class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            isUserOpen: true,
            isHistoryOpen: false,
            history: [],
        }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () =>{
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        if (window.innerWidth < 841) {
            this.setState( {
                isUserOpen: !this.state.isHistoryOpen,
            });
        } else {
            this.setState( {
                isUserOpen: true,
                isHistoryOpen: (this.props.userToChat != null || this.state.history.length !== 0),
            });
        }
    }


    currentUser = {
        nickname: 'Daniil Yaskevich',
        imgUrl: 'https://i.pinimg.com/originals/4e/73/20/4e73208be9f326816a787de2e04db80a.jpg',
        status: 'online',
    };

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

    reloadHistory = (user) => {
        //getHistoryFromDB();
        this.setState({history: [
                {
                    text: 'second message',
                    author: 'right',
                },
            ], isHistoryOpen: true});
    };

    returnToUsers = () => {
        this.setState( {
            isUserOpen: true,
            isHistoryOpen: false,
        })
    }

    render() {
        return (
                <div className="chat__screen">
                    {this.state.isUserOpen && <ChatUsers users={this.users} onUserClick={this.reloadHistory}/>}
                    {this.state.isHistoryOpen &&
                    <ChatHistory user={this.currentUser} history={this.state.history}
                                 onBackClick={() => this.returnToUsers}/>}
                </div>
        );
    }
}

export {ChatScreen}