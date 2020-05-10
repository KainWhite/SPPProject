import React from 'react';

import './commonComponents.scss';

// (Text + edit)
class FormElement extends React.Component {
  render() {
    return (
      <label className="FormAlignedItem Aligner">
          <span className="FormSpan">{this.props.title}</span>
          <input className="FormInput"
                 value={this.props.value}
                 name={this.props.name}
                 type={this.props.type}
                 onChange={this.props.onChange}/>
      </label>
    );
  }
}

export {FormElement};
