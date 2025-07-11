import './Main.scss';
import Filter from "../../widgets/Filter/Filter";
import CardGrid from "../../widgets/CardGrid/CardGrid";
import Category from "../../entities/Category/Category";
import { FC } from 'react';
import { getRndRecipes } from './Api/GetRndRecipes';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { selectFilter } from '../../store/FilterSlice';

const Main: FC = () => {

  const dispatch = useAppDispatch();

  const {recipes, findedRecipes, findedRecipesStatus} = useAppSelector(state => state.recipes);
  const state = useAppSelector(selectFilter);
  const getMoreRecipes = () => {
    const isFiltred = Object.keys(state).find((key) => !!state[key])
    if (isFiltred) return;
    dispatch(getRndRecipes())
  }

  return (
    <main className={`main`}>
      <section className={"main__main-section"}>
        <Filter />
        <div className={"main__recipes"}>
          <Category />
          <CardGrid recipes={findedRecipesStatus ? findedRecipes.length > 0 ? findedRecipes : recipes : []} getMoreFn={getMoreRecipes} />
        </div>
      </section>
    </main>
  );
};

export default Main;
