import { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from "react";
import { TEST_RECIPE, TEXTS } from "../../constants";
import LikeBtn from "../../shared/LikeBtn/LikeBtn";
import './RecipePage.scss';
import { LanguageContext } from "../../context/LanguageContext";
import globe from '../../assets/globe.svg';
import star from '../../assets/star_icon.svg';
import logo from '../../assets/logo v3.svg';
import Filter from "../../widgets/Filter/Filter";
import Category from "../../entities/Category/Category";
import CardGrid from "../../widgets/CardGrid/CardGrid";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppRedux";
import { getRndRecipes } from "../Main/Api/GetRndRecipes";
import { useLoaderData, useNavigate } from "react-router-dom";
import UserType from "../../Types/UserType";
import { ServerRecipeType } from "../../Types/ServerRecipeType";
import { removeLikeFetch } from "../../Api/RemoveLike";
import { putLikeFetch } from "../../Api/PutLike";
import RateStar from "../../shared/RateStar/RateStar";
import useForm from "../../hooks/useForm";
import { putRate } from "./Api/PutRate";

export const loader = async ({params}: {params:{recipeId: string}}) => {
    const res = await fetch(`http://localhost:2020/recipes/find/${params.recipeId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-type": 'application/json'
      }
    })
    const recipe: ServerRecipeType = await res.json();
    return {recipe}
}

export const RecipePage: FC = () => {

  const context = useContext(LanguageContext);
  const {recipe} = useLoaderData() as {recipe: ServerRecipeType};
  const dispatch = useAppDispatch();
  const {recipes, findedRecipes, findedRecipesStatus} = useAppSelector(state => state.recipes);
  const {user} = useAppSelector(state => state.user);
  const checkedUser = Object.keys(user).length === 0 ? false : user as UserType;
  const [isOpen, setIsOpen] = useState(true);
  const {inputValues, onChange} = useForm();
  const navigate = useNavigate();

  const quantityIngs: number = recipe.arrIngredients.reduce((prev: number, curr: null | string) => !curr ? prev : prev += 1, 0);

  const getMoreRecipes = useCallback(() => {dispatch(getRndRecipes());}, []);

  const checkIsLikedRecipe = (id: string) => checkedUser ? checkedUser.favorite.includes(id) : false;

  const handlePutLike = (id: string) => {
    if (checkIsLikedRecipe(id)) {
      dispatch(removeLikeFetch(id))
    } else {
      dispatch(putLikeFetch(id));
    }
  }

  const handlePutRate = (event: ChangeEvent<HTMLInputElement>, id: string) => { 
    onChange(event);
    dispatch(putRate({recipeId: id, rating: Number(event.target.value)}));
    setTimeout(() => {navigate(`/${recipe._id}`)}, 1000);
  }

  const instructionArr: string[] = recipe.strInstructions.split('\r\n');

  return (
    <section className="recipe-page">
      <img src={logo} className="recipe-page__logo" />
      <Filter extraClasses="recipe-page__filter" clipped={true} />
      <Category extraClasses="recipe-page__cat" />
      <article className="recipe-page__card">
        <aside className="recipe-page__header">
          <div className="recipe-page__img-container">
            <img className="recipe-page__image" src={recipe.strMealThumb} />
            <LikeBtn onClick={() => {handlePutLike(recipe._id)}} extraClasses="recipe-page__like" isLiked={checkIsLikedRecipe(recipe._id)} />
          </div>
          <h2 className="subtitle recipe-page__title">{recipe.strMeal}</h2>
          <div className="recipe-page__tags">
            
            <span className="recipe-page__tag">
              <img className="recipe-page__tag_img" src={TEXTS[context].categories[recipe.strCategory.toLocaleLowerCase()].image} />
              <p className="recipe-page__tag_text">{TEXTS[context].categories[recipe.strCategory.toLocaleLowerCase()].name}</p>
            </span>
            <span className="recipe-page__tag">
              <img className="recipe-page__tag_img" src={globe} />
              <p className="recipe-page__tag_text">{recipe.strArea}</p>
            </span>
            <span className="recipe-page__tag" >
              <img className="recipe-page__tag_img" src={star} />
              <p className="recipe-page__tag_text">{recipe.averageRate}</p>
            </span>
          </div>

          <div className="recipe-page__ings">
            <p onClick={() => {setIsOpen(!isOpen)}} className={`recipe-page__dd ${isOpen ? 'recipe-page__dd_open' : ''}`}>{`${TEXTS[context].btns.ings} ${quantityIngs}`}
              </p>
            <ul className="recipe-page__list">
              {recipe.arrIngredients.map((ing: string | undefined | null, i: number) => {
                return ing ? <li key={i} className="recipe-page__list_item">
                  <span>{ing}</span>
                  <span>{' - ' + recipe.arrMeasure[i]}</span>
                  </li> : <></>
              }
              )}
            </ul>
          </div>
        </aside>

        <aside className="recipe-page__main">
          
          
          <div className="recipe-page__recipe">
            {
              instructionArr.map(item => <p>{item}</p>)
            }
            <div className="recipe-page__rate">
              <h2 className="recipe-page__rate_text">{TEXTS[context].titles.rate}</h2>
              <div className="recipe-page__rate_stars">
                {[...Array(5)].map((_, i) => <RateStar id={String(i+1)} name={'recipe-rate'} isActive={inputValues['recipe-rate'] >= String(i+1)} isChecked={inputValues['recipe-rate'] === String(i+1)} value={i+1} onChange={(e) => {handlePutRate(e, recipe._id)}} />)}
              </div>
            </div>
          </div>
        </aside>
      </article>
      <CardGrid getMoreFn={getMoreRecipes} extraClasses="recipe-page__grid" recipes={findedRecipesStatus ? findedRecipes.length > 0 ? findedRecipes : recipes : []} />
    </section>
  )
}