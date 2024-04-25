import {FC, useContext} from 'react';
import './RecipeCard.scss';
import bread from '../../assets/bread_icon.svg';
import star from '../../assets/star_icon.svg';
import LikeBtn from "../../shared/LikeBtn/LikeBtn";
import {TEXTS} from "../../constants";
import {LanguageContext} from "../../context/LanguageContext";
import {ServerRecipeType, ratingType} from "../../Types/ServerRecipeType";

interface IRecipeCardProps {
  recipeInfo: ServerRecipeType
}

const RecipeCard: FC<IRecipeCardProps> = ({recipeInfo}) => {

  const context = useContext(LanguageContext);

  let category = TEXTS[context].categories[recipeInfo.strCategory.toLowerCase()];

  if (!category) {
    category = TEXTS[context].categories.starter
  }

  const covertRating = (rating: ratingType[]): number => rating.reduce((accum, cur) => accum + cur.rate, 0);
  const checkQuantityIngs = (ing: (string | null)[]): number => {
    return ing.filter(item => !!item).length;
  }

  return (
    <div className={"recipe-card"}>
      <div className={"recipe-card__overlay"} />
      <img src={recipeInfo.strMealThumb} className={"recipe-card__image"}/>
      <h3 className={"recipe-card__title"}>{recipeInfo.strMeal}</h3>
      <div className={"recipe-card__tags"}>
        <span className={"recipe-card__tag recipe-card__tag_category"}>
          <img src={category.image}/>
          {category.name}
        </span>
        <span className={"recipe-card__tag recipe-card__tag_ings"}>
          <img src={bread} />
          {checkQuantityIngs(recipeInfo.arrIngredients) + ' ' + 'ing.'}
        </span>
        <span className={"recipe-card__tag recipe-card__tag_rating"}>
          <img src={star}/>
          {covertRating(recipeInfo.rating)}
        </span>
      </div>
      <LikeBtn onClick={() => {console.log('click')}} isLiked={true} extraClasses={"recipe-card__like"} />
    </div>
  );
};

export default RecipeCard;
