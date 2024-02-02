import React, {FC} from 'react';
import '../../Category.scss';

interface ICategoryItemProps {
  text: string;
  icon: string;
  checked: boolean;
  onChoose: () => void;
}

const CategoryItem: FC<ICategoryItemProps> = ({text, icon, onChoose, checked}) => {
  return (
    <div className={`category__item ${checked ? 'category__item_checked' : ''}`} onClick={onChoose}>
      <img src={icon} className={"category__icon"}/>
      <p className={"category__text"}>{text}</p>
    </div>
  );
};

export default CategoryItem;
