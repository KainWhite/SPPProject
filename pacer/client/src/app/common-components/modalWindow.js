import React from 'react';

import './commonComponents.scss';
import {CloseButton} from './closeButton';

class ModalWindow extends React.Component {
  render() {
    return (
      <div className="ModalWindowContainer">
        <div className="ModalWindow">
            {this.props.onClose !== undefined && <CloseButton onClose={this.props.onClose}/>}
            <div className="ModalWindowContentWrapper Aligner">
            {this.props.children}
            </div>
        </div>
      </div>
    );
  }
}

export {ModalWindow};