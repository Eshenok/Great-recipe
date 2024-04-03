import { FC, MouseEventHandler } from 'react';
import './InputBtn.scss';

interface IInputBtnProps {
  extraClasses?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const InputBtn: FC<IInputBtnProps> = ({extraClasses, onClick}) => {
  return (
    <button onClick={onClick} className={`animated-btn button btn-input ${extraClasses ? extraClasses : ''}`}></button>
  );
};

export default InputBtn;
