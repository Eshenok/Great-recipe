import {FC, useEffect} from 'react';
import './CheckSwitch.scss';
import useForm from "../../hooks/useForm";
import { useAppDispatch } from '../../hooks/useAppRedux';
import { changeFilterQueryValue } from '../../store/FilterSlice';

interface ICheckSwitchProps {
  name: string;
  color: 'red' | 'blue';
}

const CheckSwitch: FC<ICheckSwitchProps> = ({name, color}) => {

  const {inputValues, onSwitch} = useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {dispatch(changeFilterQueryValue({name: 'isLiked', value:inputValues[name] ? inputValues[name]:false}))},[inputValues]);
  return (
    <div className={"check-switch"}>
      <input type={"checkbox"} name={name} onChange={onSwitch} checked={inputValues[name]} id={name} className={"check-switch__input"} />
      <label className={`check-switch__label check-switch__label_${color}`} htmlFor={name}/>
    </div>
  );
};

export default CheckSwitch;
