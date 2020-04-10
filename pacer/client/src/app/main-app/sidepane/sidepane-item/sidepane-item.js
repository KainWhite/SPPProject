import React from 'react';
import './sidepane-item.scss';

const SidepaneItem = (props) => {
  return (
    <li className="sidepane__item" key={props.id}>
      <button className="sidepane__btn" onClick={props.onClick}>{props.caption}</button>
    </li>
  );
};

export {SidepaneItem};
