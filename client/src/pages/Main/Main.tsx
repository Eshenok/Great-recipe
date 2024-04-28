import './Main.scss';
import Filter from "../../widgets/Filter/Filter";
import CardGrid from "../../widgets/CardGrid/CardGrid";
import Category from "../../entities/Category/Category";
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRndRecipes } from './Api/GetRndRecipes';
import { dropFetchedRecipes } from './Api/DropFetchedRecipes';

interface IMainProps {
  isFridge?: boolean;
  ings?: string[];
}

const Main: FC<IMainProps> = (isFridge, ings) => {

  const dispatch = useDispatch();

  const {recipes} = useSelector(state => state.recipes);

  useEffect(() => {
    if (!localStorage.getItem('recipes') || localStorage.getItem('recipes')?.length !== 0) {
      dispatch(dropFetchedRecipes());
    }
    dispatch(getRndRecipes());
  }, []);

  const getMoreRecipes = () => {
    dispatch(getRndRecipes());
  }

  return (
    <main className={`main`}>
      <section className={"main__main-section"}>
        <Filter />
        <div className={"main__recipes"}>
          <Category />
          <CardGrid recipes={recipes} getMoreFn={getMoreRecipes} />
        </div>
      </section>
    </main>
  );
};

export default Main;
