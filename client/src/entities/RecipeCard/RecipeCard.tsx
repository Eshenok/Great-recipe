import {FC, useContext} from 'react';
import './RecipeCard.scss';
import bread from '../../assets/bread_icon.svg';
import star from '../../assets/star_icon.svg';
import LikeBtn from "../../shared/LikeBtn/LikeBtn";
import {TEXTS} from "../../constants";
import {LanguageContext} from "../../context/LanguageContext";
import {ClippedServerRecipeType} from "../../Types/ServerRecipeType";
import {useNavigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppRedux';
import UserType from '../../Types/UserType';

interface IRecipeCardProps {
  recipeInfo: ClippedServerRecipeType
}

const RecipeCard: FC<IRecipeCardProps> = ({recipeInfo}) => {

  const context = useContext(LanguageContext);
  const navigate = useNavigate();
  const {user} = useAppSelector(state => state.user);
  const checkedUser = Object.keys(user).length === 0 ? false : user as UserType;
  console.log(checkedUser);

  let category = TEXTS[context].categories[recipeInfo.category.toLowerCase()];

  if (!category) {
    category = TEXTS[context].categories.starter
  }

  // const covertRating = (rating: ratingType[]): number => rating.reduce((accum, cur) => accum + cur.rate, 0);
  // const checkQuantityIngs = (ing: (string | null)[]): number => {
  //   return ing.filter(item => !!item).length;
  // }

  const chooseThis = () => {
    navigate(`/${recipeInfo._id}`);
  }

  return (
    <div className={"recipe-card"}>
      <div onClick={chooseThis} className={"recipe-card__overlay"} />
      <img src={recipeInfo.image} className={"recipe-card__image"}/>
      <h3 className={"recipe-card__title"}>{recipeInfo.name}</h3>
      <div className={"recipe-card__tags"}>
        <span className={"recipe-card__tag recipe-card__tag_category"}>
          <img src={category.image}/>
          {category.name}
        </span>
        <span className={"recipe-card__tag recipe-card__tag_ings"}>
          <img src={bread} />
          {recipeInfo?.ingridientsQuantity ? recipeInfo.ingridientsQuantity : 0}
        </span>
        <span className={"recipe-card__tag recipe-card__tag_rating"}>
          <img src={star}/>
          {recipeInfo?.rating ? recipeInfo.rating : 0}
        </span>
      </div>
      <LikeBtn onClick={() => {console.log('click')}} isLiked={checkedUser ? checkedUser.favorite.includes(recipeInfo._id) : false} extraClasses={"recipe-card__like"} />
    </div>
  );
};

export default RecipeCard;
