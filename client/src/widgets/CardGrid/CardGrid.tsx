import {FC, useContext, useEffect, useRef} from 'react';
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
  const gridRef = useRef(null);

  const xdd = (): ServerRecipeType[] => {
    const maxCards = 50;
    const xdds = [];
    for (let i=0;i<maxCards;i++) {
      xdds.push(TEST_RECIPE);
    }
    return xdds;
  }

  function checkPosition() { //ДОКА Спасибо)
    // Высота документа и экрана
    const height = document.body.offsetHeight
    const screenHeight = window.innerHeight
  
    // Сколько пикселей уже проскроллили
    const scrolled = window.scrollY
  
    // Порог
    const threshold = height - screenHeight / 4
  
    // Низ экрана относительно страницы
    const position = scrolled + screenHeight
  
    if (position >= threshold && getMoreFn) {
      getMoreFn();
    }
  }

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.addEventListener('scroll', checkPosition);
    }
  }, [gridRef])

  return (
    <section className={"cards"}>
      <Title text={TEXTS[context].titles.recipes} />
      <div className={"cards__grid"} ref={gridRef}>
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
