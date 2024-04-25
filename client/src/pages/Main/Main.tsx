import './Main.scss';
import Filter from "../../widgets/Filter/Filter";
import CardGrid from "../../widgets/CardGrid/CardGrid";
import Category from "../../entities/Category/Category";
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface IMainProps {
  isFridge?: boolean;
  ings?: string[];
}

const Main: FC<IMainProps> = (isFridge, ings) => {

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
