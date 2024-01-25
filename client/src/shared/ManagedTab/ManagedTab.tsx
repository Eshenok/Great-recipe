import React from 'react';
import './ManagedTab.scss';

const ManagedTab = ({isActive, placeholder, type, name}) => {



  return (
    <div className={`tab ${isActive ? 'tab_active' : ''}`}>
      <input className={"tab__input"} name={name} type={type} placeholder={placeholder} />
      <button className={"tab__close-btn animated-btn"} />
    </div>
  );
};

export default ManagedTab;
