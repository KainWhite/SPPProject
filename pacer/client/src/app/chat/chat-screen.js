import React from 'react';

import {ChatUsers} from './chat-users';
import {ChatHistory} from './chat-history';

import "./css/chat.scss"
import API from "../api";

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

    updateWindowDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
        if (window.innerWidth < 841) {
            this.setState({
                isUserOpen: !this.state.isHistoryOpen,
            });
        } else {
            this.setState({
                isUserOpen: true,
                isHistoryOpen: (this.props.userToChat != null || this.state.history.length !== 0),
            });
        }
    }


    currentUser = {
        nickname: 'Daniil Yaskevich',
        imgUrl: 'http://localhost:3000/images/notFound.jpg',
        status: 'online',
    };

    users = [
        {
            nickname: 'Daniil Yaskevich',
            imgUrl: 'http://localhost:3000/images/notFound.jpg',
            lastMessage: 'Some text message',
            msgTime: '1:10 PM',
        },
        {
            nickname: 'Nikita Bitkin',
            imgUrl: 'http://localhost:3000/images/notFound.jpg',
            lastMessage: 'Some text message',
            msgTime: '1:10 PM',
        },
        {
            nickname: 'Anton Kimaev',
            imgUrl: 'http://localhost:3000/images/notFound.jpg',
            lastMessage: 'Some text message',
            msgTime: '1:10 PM',
        },
        {
            nickname: 'Anton Kimaev',
            imgUrl: 'http://localhost:3000/images/notFound.jpg',
            lastMessage: 'Some text message',
            msgTime: '1:10 PM',
        },
        {
            nickname: 'Anton Kimaev',
            imgUrl: 'http://localhost:3000/images/notFound.jpg',
            lastMessage: 'Some text message',
            msgTime: '1:10 PM',
        },
        {
            nickname: 'Anton Kimaev',
            imgUrl: 'http://localhost:3000/images/notFound.jpg',
            lastMessage: 'Some text message',
            msgTime: '1:10 PM',
        },
    ];

    reloadHistory = (user) => {
        //getHistoryFromDB();
        this.setState({
            history: [
                {
                    text: 'second message',
                    author: 'right',
                    id: 1,
                },
                {
                    text: 'second message',
                    author: 'left',
                    id: 2,
                },
                {
                    text: 'second message',
                    author: 'right',
                    id: 3,
                },
                {
                    text: 'second message',
                    author: 'left',
                    id: 4,
                },
                {
                    text: 'second message',
                    author: 'right',
                    id: 5,
                },
                {
                    text: 'second message',
                    author: 'left',
                    id: 6,
                },
                {
                    text: 'second message',
                    author: 'right',
                    id: 7,
                },
                {
                    text: 'second message',
                    author: 'left',
                    id: 8,
                },
                {
                    text: 'second message',
                    author: 'right',
                    id: 9,
                },
                {
                    text: 'second message',
                    author: 'left',
                    id: 10,
                },
            ], isHistoryOpen: true, isUserOpen: this.state.width > 841
        });
    };

    returnToUsers = () => {
        this.setState({
            isUserOpen: true,
            isHistoryOpen: false,
        })
    }

    onMessageSend = async (message) => {
        let history = this.state.history;
        history.push({
                text: message,
                author: 'right',
                id: 11
            }
        );
        this.setState({history: history});
    }

    handleSubmit = async (userData) => {

        if (!userData.password || !userData.confirmPassword) return;

        let user = this.props.user;
        user.email = userData.email ? userData.email : user.email;
        user.nickname = userData.nickname ? userData.nickname : user.nickname;
        user.age = userData.age ? userData.age : user.age;
        user.about = userData.about ? userData.about : user.about;
        user.password = userData.password;
        user.confirmPassword = userData.confirmPassword;

        try {
            let response = await API.put("chat/" + this.props.user.id, user,
                { headers: {
                        "Content-Type": "application/json"}});

            console.log(response.data);

            if (!response.data.error) {
                this.props.onUserUpdate(response.data.user);
            }

        } catch(err) {
            console.log(err);
        }
    };

    render() {
        return (
            <div className="chat__screen">
                {this.state.isUserOpen && <ChatUsers users={this.users} onUserClick={this.reloadHistory}/>}
                {this.state.isHistoryOpen &&
                <ChatHistory user={this.currentUser} history={this.state.history}
                             onBackClick={() => this.returnToUsers} onMessageSend={this.onMessageSend}/>}
            </div>
        );
    }
}

export {ChatScreen}