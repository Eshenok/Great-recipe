import React, {FC, useState} from 'react';
import './CheckSwitch.scss';
import useForm from "../../hooks/useForm";

interface ICheckSwitchProps {
  name: string;
  color: 'red' | 'blue';
}

const CheckSwitch: FC<ICheckSwitchProps> = ({name, color}) => {

  const {inputValues, onSwitch} = useForm();

  return (
    <div className={"check-switch"}>
      <input type={"checkbox"} name={name} onChange={onSwitch} checked={inputValues?.[name]} id={name} className={"check-switch__input"} />
      <label className={`check-switch__label check-switch__label_${color}`} htmlFor={name}/>
    </div>
  );
};

export default CheckSwitch;
