import React from 'react';

import './commonComponents.scss';
import {CloseButton} from './closeButton';

class ModalWindow extends React.Component {
  render() {
    return (
      <div className="ModalWindowContainer" onClick={this.props.onClose}>
        <div className={"ModalWindow " + this.props.className} onClick={(e) => e.stopPropagation()}>
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