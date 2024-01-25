import React from 'react';
import Search from "../../entities/Search/Search";
import Tab from "../../shared/Tab/Tab";
import CheckSwitch from "../../shared/CheckSwitch/CheckSwitch";
import ManagedTab from "../../shared/ManagedTab/ManagedTab";

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
          <p className={"filter__title"}></p>
          <Tab text={'1'} editable={false} type={'number'}> &#128528;</Tab>
          <Tab text={'2'} editable={false} type={'number'}>&#128528;</Tab>
          <Tab text={'3'} editable={false} type={'number'}>&#129320;</Tab>
          <Tab text={'4'} editable={false} type={'number'}>&#128523;</Tab>
          <Tab text={'5'} editable={false} type={'number'}>&#129321;</Tab>
        </div>
        <div className={"filter__quantity"}>
          <p className={"filter__title"}></p>
          <ManagedTab placeholder={'Quantity'} type={"number"} isActive={true} name={"quantity-filter"} />
        </div>
        <div className={"filter__isLiked"}>
          <p className={"filter__title"}></p>
          <CheckSwitch name={'isLiked'} color={'red'} />
        </div>
      </div>
    </section>
  );
};

export default Filter;
