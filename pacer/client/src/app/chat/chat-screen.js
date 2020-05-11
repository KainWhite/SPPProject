import React from 'react';
import {ChatUsers} from './chat-users';
import {ChatHistory} from './chat-history';
import "./css/chat.scss"
import API from "../api";
import Moment from 'moment'

class ChatScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            isUserOpen: true,
            isHistoryOpen: false,
            chats: [],
            users: [],
            history: [],
            messages: [],
            userToChat: null,
            chatId: 0,
        };
    }

    componentDidMount() {
        this.reloadHistory(this.props.userToChat, null);
        this.getChats();
        this.interval = setInterval(() => {
            this.getChats();
            if (this.state.userToChat) {
                this.reloadHistory(this.state.userToChat, this.state.chatId);
            }
        }, 1000);

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        if(this.interval) {
            clearInterval(this.interval);
        }
    }

    getChats = async () => {
        let response = await API.get("chat/" + this.props.currentUser.id, null, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.data.error) {
            this.setState({
                users: [],
                chats: [],
                messages: [],
                isHistoryOpen: false,}
                );
            return;
        }
        const chats = response.data.chats;
        let users = [];
        let messages = [];
        for (const chat of chats) {
            let userId = chat.user1Id === this.props.currentUser.id ? chat.user2Id : chat.user1Id;
            let responseUser = await API.get("chat/user/" + userId, null, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let responseChat = await API.get("chat/lastMessage/" + chat.id, null, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            users.push(responseUser.data.user);
            messages.push(responseChat.data.message);
        }
        this.setState({
            chats: chats,
            users: users,
            messages: messages
        });
    };

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
    };

    reloadHistory = async (user, chatId) => {
        if (user && user.id !== this.props.currentUser.id) {
            this.setState({userToChat: user});
            if (!chatId) {
                let response = await API.get("chat/chatId/" + this.props.currentUser.id + '/' + user.id, null,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                if (response.data.error) {
                    response = await API.post("chat/chatCreate/" + this.props.currentUser.id + '/' + user.id, null,
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                    this.setState({
                        users: this.state.users.unshift(user),
                        chats: this.state.chats.unshift(response.data.chat),
                    });
                }
                this.getChats();
                chatId = response.data.chat.id;
            }
            this.setState( {
                isUserOpen: this.state.width > 841, chatId: chatId,
            });

            let response = await API.get("chat/chat/" + chatId, null, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let history = response.data.history ? response.data.history : [];
            history.forEach((message) => {
                message.author = this.props.currentUser.id === message.userSenderId ? 'right' : 'left';
            });
            this.setState({
                history: history, isHistoryOpen: true,
            });
        }
    };

    returnToUsers = () => {
        this.setState({
            isUserOpen: true,
            isHistoryOpen: false,
        })
    };

    onMessageSend = async (message) => {
        if (message !== '') {
            const stamp = Moment().format("YYYY-MM-DD HH:mm:ss");
            let response = await API.post("chat/message", {
                chatId: this.state.chatId,
                userSenderId: this.props.currentUser.id,
                text: message,
                dateTime: stamp,
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.error) {
                this.reloadHistory(this.state.userToChat, this.state.chatId);
            }
        }
    };

    render() {
        return (
            <div className="chat__screen">
                {this.state.isUserOpen && this.state.users.length > 0 &&
                <ChatUsers users={this.state.users} chats={this.state.chats} messages={this.state.messages} onUserClick={this.reloadHistory}/>}
                {this.state.isHistoryOpen && this.state.userToChat &&
                <ChatHistory user={this.state.userToChat} history={this.state.history}
                             onBackClick={() => this.returnToUsers} onMessageSend={this.onMessageSend}/>}
                {this.state.users.length === 0 ? <h1 className="chat__info">No chats available</h1> : ''}
            </div>
        );
    }
}

export {ChatScreen}
