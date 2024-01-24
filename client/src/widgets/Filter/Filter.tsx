import React from 'react';
import Search from "../../entities/Search/Search";
import Tab from "../../shared/Tab/Tab";

const Filter = () => {

  const tabsPrevFinded = () => {
    const maxQuantity = 7;
    const tabs = [];

    for (let i=0;i<maxQuantity;i++) {
      tabs.push(
        <Tab text={'Apple'} >
          <button className={"tab__close-btn animated-btn"} onClick={() => {console.log('Gone.Fludd "Как делишки?" acoustic version')}} />
        </Tab>
      )
    }
    return tabs;
  }

  return (
    <section className={"filter"}>
      <div className={"filter__header"}>
        <Search />
        {
          tabsPrevFinded()
        }
      </div>
      <div className={"filter__bottom"}>
        <div className={"filter__rating"}>

        </div>
        <div className={"filter__quantity"}>
        </div>
        <div className={"filter__isLiked"}>

        </div>
      </div>
    </section>
  );
};

export default Filter;
