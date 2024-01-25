import React from 'react';
import './Tab.scss';

const Tab = ({text, children, isActive}) => {
  return (
    <div className={`tab ${isActive ? 'tab_active' : ''}`}>
      <p className={"tab__text"}>{text}</p>
      {children}
    </div>
  );
};

export default Tab;
