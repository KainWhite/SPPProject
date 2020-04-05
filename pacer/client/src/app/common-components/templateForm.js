import React from 'react';

import './commonComponents.scss';
import {FormElement} from './formElement';

class TemplateForm extends React.Component {
  render() {
    const formElements = this.props.formTemplate.map(
      (el) => <FormElement key={el.name}
                           value={this.props.data[el.name]} 
                           title={el.title} 
                           name={el.name}
                           type={el.type}
                           onChange={this.props.onChange}/>
    );

    return (<>{formElements}</>);
  }
}

export {TemplateForm};