import React from 'react';
import './InputBtn.scss';

const InputBtn = ({extraClasses, onClick}) => {
  return (
    <button onClick={onClick} className={`animated-btn button btn-input ${extraClasses ? extraClasses : ''}`}></button>
  );
};

export default InputBtn;
