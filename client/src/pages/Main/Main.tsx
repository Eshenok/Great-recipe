import './Main.scss';
import Filter from "../../widgets/Filter/Filter";
import CardGrid from "../../widgets/CardGrid/CardGrid";
import Category from "../../entities/Category/Category";

const Main = () => {

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
