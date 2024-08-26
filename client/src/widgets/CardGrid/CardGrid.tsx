import React, {FC, memo, useContext} from 'react';
import './CardGrid.scss';
import {TEXTS} from "../../constants";
import {ClippedServerRecipeType} from "../../Types/ServerRecipeType";
import RecipeCard from "../../entities/RecipeCard/RecipeCard";
import Title from "../../shared/Title/Title";
import {LanguageContext} from "../../context/LanguageContext";

interface ICardGridProps {
  recipes: ClippedServerRecipeType[],
  getMoreFn?: () => void;
  clearFilter?: () => void;
  extraClasses?: string;
}

const CardGrid: FC<ICardGridProps> = memo(function CardGrid({recipes, getMoreFn, clearFilter, extraClasses}) {
  const context = useContext(LanguageContext);

  // Функция проверяет положение скролла и если выше половины то делает запрос на получение еще рецептов
  function checkPosition(e: React.UIEvent<HTMLDivElement>): void {
    const target = e.target as HTMLDivElement;
    const height = target.scrollHeight;
    const scrolled = target.scrollTop;
    const clHe = target.clientHeight;
    if (height - scrolled == clHe && getMoreFn) {getMoreFn()};
  };

  return (
    <section className={`cards ${extraClasses ? extraClasses : ''}`}>
      <Title text={TEXTS[context].titles.recipes} />
      <div className={"cards__grid"} onScroll={checkPosition}>
        {
          recipes.length > 0 && recipes.map((item) =>
            <RecipeCard key={item._id} recipeInfo={item} />
          )
        }
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
