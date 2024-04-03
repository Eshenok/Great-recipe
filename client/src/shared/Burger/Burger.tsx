import {FC} from 'react';
import './Burger.scss';

interface IBurgerProps {
  extraClasses?: string;
  onClick: () => void;
}

const Burger: FC<IBurgerProps> = ({extraClasses, onClick}) => {
  return (
    <div className={`burger ${extraClasses ?? ''}`} onClick={onClick} />
  );
};

export default Burger;
