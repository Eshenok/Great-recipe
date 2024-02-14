import React, {useState} from 'react';
import './Main.scss';
import Header from "../../widgets/Header/Header";
import Filter from "../../widgets/Filter/Filter";
import CardGrid from "../../widgets/CardGrid/CardGrid";
import Category from "../../entities/Category/Category";
import Burger from "../../shared/Burger/Burger";

const Main = () => {

  return (
    <main className={`main`}>
      <section className={"main__main-section"}>
        <Filter extraClasses={'main__filter'} />
        <div className={"main__recipes"}>
          <Category />
          <CardGrid />
        </div>
      </section>
    </main>
  );
};

export default Main;
