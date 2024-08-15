import { FC, useContext, useState } from "react";
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
import { useLoaderData } from "react-router-dom";
import UserType from "../../Types/UserType";
import { ServerRecipeType } from "../../Types/ServerRecipeType";
import { removeLikeFetch } from "../../Api/RemoveLike";
import { putLikeFetch } from "../../Api/PutLike";

export const loader = async ({params}) => {
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
  const {recipe} = useLoaderData();
  const dispatch = useAppDispatch();
  const {recipes, findedRecipes, findedRecipesStatus} = useAppSelector(state => state.recipes);
  const {user} = useAppSelector(state => state.user);
  const checkedUser = Object.keys(user).length === 0 ? false : user as UserType;
  const [isOpen, setIsOpen] = useState(true);

  const quantityIngs: number = recipe.arrIngredients.reduce((prev: number, curr: null | string) => {
    if (!curr) return prev;
    return prev += 1;
  }, 0)

  const getMoreRecipes = () => {
    dispatch(getRndRecipes());
  }

  const checkIsLikedRecipe = (id: string) => checkedUser ? checkedUser.favorite.includes(id) : false;

  const handlePutLike = (id: string) => {
    if (checkIsLikedRecipe(id)) {
      dispatch(removeLikeFetch(id))
    } else {
      dispatch(putLikeFetch(id));
    }
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
              <p className="recipe-page__tag_text">3.7</p>
            </span>
          </div>

          <div className="recipe-page__ings">
            <p onClick={() => {setIsOpen(!isOpen)}} className={`recipe-page__dd ${isOpen ? 'recipe-page__dd_open' : ''}`}>{`${TEXTS[context].btns.ings} ${quantityIngs}`}
              </p>
            <ul className="recipe-page__list">
              {recipe.arrIngredients.map((ing, i) => {
                return ing ? <li className="recipe-page__list_item">
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
          </div>
        </aside>
      </article>
      <CardGrid getMoreFn={getMoreRecipes} extraClasses="recipe-page__grid" recipes={findedRecipesStatus ? findedRecipes.length > 0 ? findedRecipes : recipes : []} />
    </section>
  )
}