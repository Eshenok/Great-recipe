import React, {useCallback, useState} from 'react';
import './ManagedTab.scss';
import useForm from "../../hooks/useForm";

const ManagedTab = ({isActive, placeholder, type, name, max}) => {

  const {inputValues, onChange, dropValue} = useForm();

  const validateChangeValue = (e) => {
    if (e.target.value > max) {
      return;
    } else {
      onChange(e)
    }
  }

  return (
    <div className={`tab ${isActive ? 'tab_active' : ''}`}>
      <input
        style={{width: `${inputValues[name] ? inputValues[name].length : placeholder.length - 1}ch`}}
        className={"tab__input"}
        name={name}
        type={type}
        placeholder={placeholder}
        value={inputValues[name]}
        onChange={validateChangeValue}
      />
      <button className={"tab__close-btn animated-btn"} onClick={() => {dropValue(name)}} />
    </div>
  );
};

export default ManagedTab;
