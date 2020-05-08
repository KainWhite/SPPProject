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
            chatId: 0,
            chats: [],
            users: [],
            history: [],
            userToChat: null,
        };
        //this.getChats();
    }

    componentDidMount() {
        this.getChats();
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    getChats = async () => {
        let response = await API.get("chat/" + this.props.currentUser.id, null, { headers: {
                "Content-Type": "application/json"}});
        if(response.data.error) {
            return;
        }
        this.setState({chats: response.data.chats});
        let users = [];
        for(const chat of this.state.chats) {
            let userId = chat.user1Id === this.props.currentUser.id ? chat.user2Id : chat.user1Id;
            response = await API.get("chat/user/" + userId, null, { headers: {
                    "Content-Type": "application/json"}});
            users.push(response.data.user);
        }
        this.setState({users: users});
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



    reloadHistory = (user) => {
        this.setState({userToChat: user});
        //getHistoryFromDB();
        this.setState({
            history: [
                {
                    text: 'second message',
                    author: 'right',
                    id: 1,
                },
            ], isHistoryOpen: true, isUserOpen: this.state.width > 841
        });
    };

    returnToUsers = () => {
        this.setState({
            isUserOpen: true,
            isHistoryOpen: false,
        })
    };

    onMessageSend = async (message) => {
        //const response  = API.post("/user" + 1, [this.props.currentUser, message, this.state.chatId], { headers: {
                //"Content-Type": "application/json"}});
        let history = this.state.history;
        history.push({
                text: message,
                author: 'right',
                id: 11
            }
        );
        this.setState({history: history});
    };

    render() {
        return (
            <div className="chat__screen">
                {this.state.isUserOpen && <ChatUsers users={this.state.users} onUserClick={this.reloadHistory}/>}
                {this.state.isHistoryOpen &&
                <ChatHistory user={this.state.userToChat} history={this.state.history}
                             onBackClick={() => this.returnToUsers} onMessageSend={this.onMessageSend}/>}
            </div>
        );
    }
}

export {ChatScreen}