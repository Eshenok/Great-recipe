import { FC, TouchEvent, useContext, useRef, useState} from 'react';
import {TEXTS} from "../../constants";
import {LanguageContext} from "../../context/LanguageContext";
import CategoryItem from "./components/CategoryItem/CategoryItem";
import { useSelector} from "react-redux";
import {changeCurrCategories, selectCategories} from "../../store/categorySlice";
import { CategoryItemFullType } from '../../Types/CategoryItemType';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { changeFilterQueryValue, selectFilter } from '../../store/FilterSlice';

interface ICategoryProps {
  extraClasses?: string;
}

const Category: FC<ICategoryProps> = ({extraClasses}) => {

  const context = useContext(LanguageContext);
  const {categories} = useSelector(selectCategories);
  const {category} = useAppSelector(selectFilter)
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => setStartX(e.touches[0].clientX);

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const deltaX = e.touches[0].clientX - startX;
    if (containerRef.current) {
      containerRef.current.scrollLeft -= deltaX;
      setStartX(e.touches[0].clientX);
    }
  };

  const handleChooseCategory = (key: string, checked: boolean) => {
    dispatch(changeCurrCategories({name: key}));
    dispatch(changeFilterQueryValue({name: 'category', value: !checked ? key : ''}));
  }

  return (
    <div
      className={`category ${extraClasses ?? ''}`}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <h3 className={"category__title"}>{TEXTS[context].titles.category}</h3>
      {
        categories.map((elem: CategoryItemFullType) =>
          <CategoryItem 
          checked={elem.key === category} 
          onChoose={() => {handleChooseCategory(elem.key, elem.checked)}} 
          text={elem.name} 
          icon={elem.image} 
          key={elem.key} 
          />
        )
      }
    </div>
  );
};

export default Category;
