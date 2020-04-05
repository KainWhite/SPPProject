import React from 'react';

import {RoundImage} from '../common-components/roundImage';

class ChatProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='chat__users-profile'>
                <RoundImage imgUrl={this.props.imgUrl} alt="User avatar"/>
                <h1 className="chat__users-nickname">{this.props.nickname}</h1>
            </div>
        );
    }
}

export {ChatProfile}