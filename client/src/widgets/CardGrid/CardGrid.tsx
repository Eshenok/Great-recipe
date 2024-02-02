import React, {FC, useContext} from 'react';
import './CardGrid.scss';
import {TEST_RECIPE, TEXTS} from "../../constants";
import {ServerRecipeType} from "../../Types/ServerRecipeType";
import RecipeCard from "../../entities/RecipeCard/RecipeCard";
import Title from "../../shared/Title/Title";
import {LanguageContext} from "../../context/LanguageContext";

const CardGrid: FC = () => {

  const context = useContext(LanguageContext);

  const xdd = (): ServerRecipeType[] => {
    const maxCards = 50;
    const xdds = [];
    for (let i=0;i<maxCards;i++) {
      xdds.push(TEST_RECIPE);
    }
    return xdds;
  }

  return (
    <section className={"cards"}>
      <Title text={TEXTS[context].titles.recipes} />
      <div className={"cards__grid"}>
        {
          xdd().map((item) =>
            <RecipeCard key={item._id} recipeInfo={item} />
          )
        }
      </div>
    </section>
  );
};

export default CardGrid;
