import React, {FC, memo, useContext, useLayoutEffect, useRef} from 'react';
import './CardGrid.scss';
import {TEXTS} from "../../constants";
import {ClippedServerRecipeType} from "../../Types/ServerRecipeType";
import RecipeCard from "../../entities/RecipeCard/RecipeCard";
import Title from "../../shared/Title/Title";
import {LanguageContext} from "../../context/LanguageContext";
import { useLocation } from 'react-router-dom';

interface ICardGridProps {
  recipes: ClippedServerRecipeType[],
  getMoreFn?: () => void;
  clearFilter?: () => void;
  extraClasses?: string;
}

const CardGrid: FC<ICardGridProps> = memo(function CardGrid({recipes, getMoreFn, clearFilter, extraClasses}) {
  const context = useContext(LanguageContext);
  const cardGridRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation(); 

  const scrollPositionKey = `scrollPosition-${location.pathname}`;

  useLayoutEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(scrollPositionKey);
    if (savedScrollPosition && (cardGridRef.current && cardRef.current)) {
      const clWi = document.body.clientWidth; 
      switch (true){
        case clWi < 725:
          cardRef.current.scrollTop = parseFloat(savedScrollPosition);
          break;
        default:
          cardGridRef.current.scrollTop = parseFloat(savedScrollPosition);
      }
    }
  }, [scrollPositionKey, cardGridRef, cardRef]);

    // Функция проверяет положение скролла и если выше половины, то делает запрос на получение еще рецептов
    function checkPosition(e: React.UIEvent<HTMLDivElement>): void {
      const target = e.target as HTMLDivElement;
      const height = target.scrollHeight;
      const scrolled = target.scrollTop;
      const clHe = target.clientHeight;
  
      if (height - scrolled === clHe && getMoreFn) {
        getMoreFn();
      }
      sessionStorage.setItem(scrollPositionKey, scrolled.toString());
    }

  return (
    <section ref={cardRef} onScroll={checkPosition} className={`cards ${extraClasses ? extraClasses : ''}`}>
      <Title text={TEXTS[context].titles.recipes} />
      <div ref={cardGridRef} onScroll={checkPosition} className={"cards__grid"}>
        {recipes.length > 0 && recipes.map((item) => <RecipeCard key={item._id} recipeInfo={item} />)}
        {
          recipes.length === 0 && 
          <div className='cards__nf'>
            <h3 className='cards__subtitle'>{TEXTS[context].info.recipesNf}</h3>
            <div className='cards__nf-image'/>
            <p className='cards__drop-filter' onClick={clearFilter}>{TEXTS[context].btns.clearFilter}</p>
          </div>
        }
      </div>
    </section>
  );
});

export default CardGrid;
