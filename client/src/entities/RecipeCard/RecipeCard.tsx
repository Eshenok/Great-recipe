import React from 'react';
import './RecipeCard.scss';
import LikeBtn from "../../shared/LikeBtn/LikeBtn";

const RecipeCard = ({recipeInfo}) => {
  return (
    <div className={"recipe-card"}>
      <img src={recipeInfo.strMealThumb} className={"recipe-card__image"}/>
      <h3 className={"recipe-card__title"}><a href={`#${recipeInfo.strMeal}`}>{recipeInfo.strMeal}</a></h3>
      <div className={"recipe-card__tags"}>
        <span className={"recipe-card__tag recipe-card__tag_category"}>{recipeInfo.strCategory}</span>
        <span className={"recipe-card__tag recipe-card__tag_ings"}></span>
        <span className={"recipe-card__tag recipe-card__tag_rating"}></span>
      </div>
      <LikeBtn isLiked={true} />
    </div>
  );
};

export default RecipeCard;
