import { TouchEvent, useContext, useRef, useState} from 'react';
import {TEXTS} from "../../constants";
import {LanguageContext} from "../../context/LanguageContext";
import CategoryItem from "./components/CategoryItem/CategoryItem";
import CheckSwitch from "../../shared/CheckSwitch/CheckSwitch";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrCategories} from "../../store/categorySlice";

const Category = () => {

  const context = useContext(LanguageContext);
  const {categories} = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const deltaX = e.touches[0].clientX - startX;
    if (containerRef.current) {
      containerRef.current.scrollLeft -= deltaX;
      setStartX(e.touches[0].clientX);
    }
  };

  const handleChooseCategory = (name: string) => {
    dispatch(changeCurrCategories({name: name}));
  }

  return (
    <div
      className={"category"}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <h3 className={"category__title"}>{TEXTS[context].titles.infridge}</h3>
      <CheckSwitch name={'infridge'} color={'blue'} />
      <h3 className={"category__title"}>{TEXTS[context].titles.category}</h3>
      {
        categories.map(elem =>
          <CategoryItem checked={elem.checked} onChoose={() => {handleChooseCategory(elem.name)}} text={elem.name} icon={elem.image} key={elem.key} />
        )
      }
    </div>
  );
};

export default Category;
