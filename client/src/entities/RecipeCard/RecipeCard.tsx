import {FC, useContext} from 'react';
import './RecipeCard.scss';
import bread from '../../assets/bread_icon.svg';
import star from '../../assets/star_icon.svg';
import LikeBtn from "../../shared/LikeBtn/LikeBtn";
import {TEXTS} from "../../constants";
import {LanguageContext} from "../../context/LanguageContext";
import {ClippedServerRecipeType} from "../../Types/ServerRecipeType";
import {useNavigate} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import UserType from '../../Types/UserType';
import { putLikeFetch } from '../../Api/PutLike';
import { removeLikeFetch } from '../../Api/RemoveLike';

interface IRecipeCardProps {
  recipeInfo: ClippedServerRecipeType
}

const RecipeCard: FC<IRecipeCardProps> = ({recipeInfo}) => {

  const context = useContext(LanguageContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user);

  const checkedUser = Object.keys(user).length === 0 ? false : user as UserType;
  let category = TEXTS[context].categories[recipeInfo.category.toLowerCase()];

  if (!category) {
    category = TEXTS[context].categories.starter
  }

  const chooseThis = () => navigate(`/${recipeInfo._id}`);
  const checkIsLikedRecipe = (id: string) => checkedUser ? checkedUser.favorite.includes(id) : false;
  const handlePutLike = (id: string) => dispatch(checkIsLikedRecipe(id) ? removeLikeFetch(id) : putLikeFetch(id));

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
      <LikeBtn onClick={() => {handlePutLike(recipeInfo._id)}} isLiked={checkIsLikedRecipe(recipeInfo._id)} extraClasses={"recipe-card__like"} />
    </div>
  );
};

export default RecipeCard;
