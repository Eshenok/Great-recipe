import {ChangeEvent, FC, useEffect} from 'react';
import './ManagedTab.scss';
import useForm from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { changeFilterQueryValue, selectFilter } from '../../store/FilterSlice';

interface IManagedTabProps {
  text: string;
  placeholder: string;
  isActive: boolean;
  type: string;
  name: string;
  max: number;
}


const ManagedTab:FC<IManagedTabProps> = ({isActive, placeholder, type, name, max}) => {

  const {inputValues, onChange, dropValue, onPut} = useForm();
  const dispatch = useAppDispatch();
  const {quantity} = useAppSelector(selectFilter);

  const validateChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > String(max).length) {
      return;
    } else if (Number(e.target.value) > max) {
      onPut(name, `${max}`);
    } else {
      onChange(e)
    }
  }

  useEffect(() => {
    dispatch(changeFilterQueryValue({name: 'quantity', value: inputValues[name] ? inputValues[name]: ''}))
  }, [inputValues])

  useEffect(() => {
    onPut(name, quantity);
  }, [quantity]);

  return (
    <div className={`tab tab_managed ${isActive ? 'tab_active' : ''}`}>
      <input
        style={{width: `${inputValues[name] ? inputValues[name].length : placeholder.length}ch`}}
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
