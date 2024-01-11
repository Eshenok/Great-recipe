import React, {FC} from 'react';
import '../../Category.scss';

interface ICategoryItemProps {
  text: string;
  icon: string;
}

const CategoryItem: FC<ICategoryItemProps> = ({text, icon}) => {
  return (
    <div className={"category__item"}>
      <img src={icon} className={"category__icon"}/>
      <p className={"category__text"}>{text}</p>
    </div>
  );
};

export default CategoryItem;
