import React, {FC, useContext} from 'react';
import './CardGrid.scss';
import {TEST_RECIPE, TEXTS} from "../../constants";
import {ServerRecipeType} from "../../Types/ServerRecipeType";
import RecipeCard from "../../entities/RecipeCard/RecipeCard";
import Title from "../../shared/Title/Title";
import {LanguageContext} from "../../context/LanguageContext";

interface ICardGridProps {
  recipes: ServerRecipeType[],
  getMoreFn?: () => void;
}

const CardGrid: FC<ICardGridProps> = ({recipes, getMoreFn}) => {

  const context = useContext(LanguageContext);

  console.log(recipes.length);

  function checkPosition(e: React.UIEvent<HTMLDivElement>): void {
    const target = e.target as HTMLDivElement;
    const height = target.scrollHeight;
    const scrolled = target.scrollTop;
    if (scrolled >= height/2 && getMoreFn) {getMoreFn()};
  };

  // useEffect(() => {
  //   if (gridRef.current) {
  //     gridRef.current.addEventListener('scroll', checkPosition);
  //   }
  // }, [gridRef])

  return (
    <section className={"cards"}>
      <Title text={TEXTS[context].titles.recipes} />
      <div className={"cards__grid"} onScroll={checkPosition}>
        {
          recipes.map((item) =>
            <RecipeCard key={item._id} recipeInfo={item} />
          )
        }
      </div>
    </section>
  );
};

export default CardGrid;
