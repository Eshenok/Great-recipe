import { FC } from "react";
import './SubBurger.scss';

interface ISubBurgerProps {
  extraClasses?: string;
  onClick: () => void;
  isShowed: boolean;
};

const SubBurger: FC<ISubBurgerProps> = ({extraClasses, onClick, isShowed}) => {
  return (
    <div className={`${extraClasses ?? ''} ${isShowed ? 'sub-burger__showed':''} sub-burger`} onClick={onClick} />
  );
};

export default SubBurger;