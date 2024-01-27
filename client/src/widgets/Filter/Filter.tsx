import React, {useContext} from 'react';
import './Filter.scss';
import Search from "../../entities/Search/Search";
import Tab from "../../shared/Tab/Tab";
import CheckSwitch from "../../shared/CheckSwitch/CheckSwitch";
import ManagedTab from "../../shared/ManagedTab/ManagedTab";
import {LanguageContext} from "../../context/LanguageContext";
import {TEXTS} from "../../constants";

const Filter = () => {

  const context = useContext(LanguageContext);
  // const context = 'ru';

  const tabsPrevFinded = () => {
    const maxQuantity = 7;
    const tabs = [];

    for (let i=0;i<maxQuantity;i++) {
      tabs.push(
        <Tab text={'Apple'} key={i} >
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
        <div className={"filter__prev"}>
          {
            tabsPrevFinded()
          }
        </div>
      </div>
      <div className={"filter__bottom"}>
        <div className={"filter__rating filter__section"}>
          <p className={"filter__title"}>{TEXTS[context].filter.rating}</p>
          <Tab text={'1'} editable={false} type={'number'}>&#128528;</Tab>
          <Tab text={'2'} editable={false} type={'number'}>&#128528;</Tab>
          <Tab text={'3'} editable={false} type={'number'}>&#129320;</Tab>
          <Tab text={'4'} editable={false} type={'number'}>&#128523;</Tab>
          <Tab text={'5'} editable={false} type={'number'}>&#129321;</Tab>
        </div>
        <div className={"filter__quantity filter__section"}>
          <p className={"filter__title"}>{TEXTS[context].filter.ingr}</p>
          <ManagedTab max={20} placeholder={TEXTS[context].inputph.ings} type={"number"} isActive={true} name={"quantity-filter"} />
        </div>
        <div className={"filter__isLiked filter__section"}>
          <p className={"filter__title"}>{TEXTS[context].filter.favourite}</p>
          <CheckSwitch name={'isLiked'} color={'red'} />
        </div>
      </div>
    </section>
  );
};

export default Filter;
