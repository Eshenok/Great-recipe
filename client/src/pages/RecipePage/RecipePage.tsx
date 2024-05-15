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
import { useAppSelector } from "../../hooks/useAppRedux";

export const RecipePage: FC = () => {

  const context = useContext(LanguageContext);
  const {recipes} = useAppSelector(state => state.recipes);
  const [isOpen, setIsOpen] = useState(true);

  const quantityIngs: number = TEST_RECIPE.arrIngredients.reduce((prev, curr) => {
    if (!curr) return prev;
    return prev += 1;
  }, 0)

  const instructionArr: string[] = TEST_RECIPE.strInstructions.split('\r\n');

  return (
    <section className="recipe-page">
      <img src={logo} className="recipe-page__logo" />
      <Filter extraClasses="recipe-page__filter" clipped={true} />
      <Category extraClasses="recipe-page__cat" />
      <article className="recipe-page__card">
        <aside className="recipe-page__header">
          <div className="recipe-page__img-container">
            <img className="recipe-page__image" src={TEST_RECIPE.strMealThumb} />
            <LikeBtn onClick={() => {console.log('WOW! 1984')}} extraClasses="recipe-page__like" isLiked={true} />
          </div>
          <h2 className="subtitle recipe-page__title">{TEST_RECIPE.strMeal}</h2>
          <div className="recipe-page__tags">
            
            <span className="recipe-page__tag">
              <img className="recipe-page__tag_img" src={TEXTS[context].categories[TEST_RECIPE.strCategory.toLocaleLowerCase()].image} />
              <p className="recipe-page__tag_text">{TEXTS[context].categories[TEST_RECIPE.strCategory.toLocaleLowerCase()].name}</p>
            </span>
            <span className="recipe-page__tag">
              <img className="recipe-page__tag_img" src={globe} />
              <p className="recipe-page__tag_text">{TEST_RECIPE.strArea}</p>
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
              {TEST_RECIPE.arrIngredients.map((ing, i) => {
                return ing ? <li className="recipe-page__list_item">
                  <span>{ing}</span>
                  <span>{' - ' + TEST_RECIPE.arrMeasure[i]}</span>
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
      <CardGrid extraClasses="recipe-page__grid" recipes={recipes} />
    </section>
  )
}