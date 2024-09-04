import { FC } from "react";
import './SubBurger.scss';
import { useLocation } from "react-router-dom";

interface ISubBurgerProps {
  extraClasses?: string;
  onClick: (variant: 'back' | 'top') => void;
  isShowed: boolean;
};

const SubBurger: FC<ISubBurgerProps> = ({extraClasses, onClick, isShowed}) => {

  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/fridge' || location.pathname === '/') {
      onClick('top');
    } else {
      onClick('back');
    }
  }

  return (
    <div className={`${extraClasses ?? ''} ${isShowed ? 'sub-burger__showed':''} sub-burger`} onClick={handleClick} />
  );
};

export default SubBurger;