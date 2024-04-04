import './Main.scss';
import Filter from "../../widgets/Filter/Filter";
import CardGrid from "../../widgets/CardGrid/CardGrid";
import Category from "../../entities/Category/Category";
import { useFetcher, useLoaderData } from 'react-router-dom';
import { FC, useEffect } from 'react';

export const loader = async () => {
  console.log('we are here')
  const res = await fetch('http://localhost:2020/recipes/rnd',{
    method: 'GET',
    credentials: 'include'
  });

  if(res.status === 401 || res.status === 500) {
    return {recipes: null}
  }

  const recipes = await res.json();
  return {recipes}
}

interface IMainProps {
  isFridge?: boolean;
  ings?: string[];
}

const Main: FC<IMainProps> = (isFridge, ings) => {

  // const fetcher = useFetcher();

  // useEffect(() => {

  // }, [])

  return (
    <main className={`main`}>
      <section className={"main__main-section"}>
        <Filter />
        <div className={"main__recipes"}>
          <Category />
          <CardGrid />
        </div>
      </section>
    </main>
  );
};

export default Main;
