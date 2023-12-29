import React from 'react';
import './InputOutlined.scss';

const InputOutlined = ({name, values, onChange, placeholder}) => {

  return (
    <input placeholder={placeholder} type={'text'} className={"input input__outlined"} name={name} onChange={onChange} value={values?.[name]} />
  );
};

export default InputOutlined;
