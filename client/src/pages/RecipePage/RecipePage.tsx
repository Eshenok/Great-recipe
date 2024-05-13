import { useContext, useState } from "react";
import { TEST_RECIPE, TEXTS } from "../../constants";
import LikeBtn from "../../shared/LikeBtn/LikeBtn";
import './RecipePage.scss';
import { LanguageContext } from "../../context/LanguageContext";
import globe from '../../assets/globe.svg';
import star from '../../assets/star_icon.svg';
import logo from '../../assets/logo v3.svg';

export const RecipePage = () => {

  const context = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(true);

  const quantityIngs = TEST_RECIPE.arrIngredients.reduce((prev, curr) => {
    if (!curr) return prev;
    return prev += 1;
  }, 0)

  return (
    <section className="recipe-page">
      <img src={logo} className="recipe-page__logo" />
      <article className="recipe-page__card">
        <aside className="recipe-page__header">
          <img className="recipe-page__image" src={TEST_RECIPE.strMealThumb} />
          <LikeBtn onClick={() => {console.log('WOW! 1984')}} extraClasses="recipe-page__like" isLiked={true} />
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
        </aside>

        <aside className="recipe-page__main">
          <div className="recipe-page__ings">
            <p onClick={() => {setIsOpen(!isOpen)}} className={`recipe-page__dd ${isOpen ? 'recipe-page__dd_open' : ''}`}>{`${TEXTS[context].btns.ings} ${quantityIngs}`}
              </p>
            <ul className="recipe-page__list">
              {TEST_RECIPE.arrIngredients.map((ing, i) => {
                return ing ? <li className="recipe-page__list_item">{`${ing} - ${TEST_RECIPE.arrMeasure[i]}`}</li> : <></>
              }
              )}
            </ul>
          </div>
          
          <div className="recipe-page__recipe">
          Heat the oil in a large pan. Add the duck legs and brown on all sides for about 10 mins. Remove to a plate and set aside. Add the onions to the pan and cook for 5 mins until softened. Add the garlic and cook for a further 1 min, then stir in the cinnamon and flour and cook for a further min. Return the duck to the pan, add the wine, tomatoes, stock, herbs, sugar and seasoning. Bring to a simmer, then lower the heat, cover with a lid and cook for 2 hrs, stirring every now and then.

Carefully lift the duck legs out of the sauce and place on a plate – they will be very tender so try not to lose any of the meat. Pull off and discard the fat, then shred the meat with 2 forks and discard the bones. Add the meat back to the sauce with the milk and simmer, uncovered, for a further 10-15 mins while you cook the pasta.

Cook the pasta following pack instructions, then drain, reserving a cup of the pasta water, and add the pasta to the ragu. Stir to coat all the pasta in the sauce and cook for 1 min more, adding a splash of cooking liquid if it looks dry. Serve with grated Parmesan, if you like.
          </div>
        </aside>
      </article>
    </section>
  )
}