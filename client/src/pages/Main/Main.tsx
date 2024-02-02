import React, {useState} from 'react';
import './Main.scss';
import Header from "../../widgets/Header/Header";
import Filter from "../../widgets/Filter/Filter";
import CardGrid from "../../widgets/CardGrid/CardGrid";
import Category from "../../entities/Category/Category";
import Burger from "../../shared/Burger/Burger";

const Main = ({onSwapLanguage}) => {

  const [isOpenHeader, setIsOpenHeader] = useState(false);
  const openHeader = () => setIsOpenHeader(!isOpenHeader);

  return (
    <main className={`main ${isOpenHeader ? 'main_open-head' : ''}`}>
      <Header onSwapLanguage={onSwapLanguage} extraClasses={`main__sidebar`} />
      <Burger onClick={openHeader} extraClasses={'main__burger'} />
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
