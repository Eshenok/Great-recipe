import {FC, useContext, useState} from 'react';
import './Filter.scss';
import Search from "../../entities/Search/Search";
import Tab from "../../shared/Tab/Tab";
import CheckSwitch from "../../shared/CheckSwitch/CheckSwitch";
import ManagedTab from "../../shared/ManagedTab/ManagedTab";
import {LanguageContext} from "../../context/LanguageContext";
import {TEXTS} from "../../constants";

const Filter: FC = () => {

  const context = useContext(LanguageContext);

  const [isOpen, setIsOpen] = useState(true);
  const ph = TEXTS[context].inputph.ings as string;

  const tabsPrevFinded = () => {
    const maxQuantity = 7;
    const tabs = [];

    for (let i=0;i<maxQuantity;i++) {
      tabs.push(
        <Tab isActive={false} text={'Apple'} key={i} >
          <button className={"tab__close-btn animated-btn"} onClick={() => {console.log('Gone.Fludd "Как делишки?" acoustic version')}} />
        </Tab>
      )
    }
    return tabs;
  }

  return (
    <section className={`filter`}>
      <div className={"filter__header"}>
        <Search isOpen={isOpen} onOpen={() => {setIsOpen(!isOpen)}} />
        <div className={"filter__prev"}>
          {
            tabsPrevFinded()
          }
        </div>
      </div>
      <div className={`filter__bottom ${isOpen ? 'filter__bottom_open' : ''}`}>
        <div className={"filter__rating filter__section"}>
          <h3 className={"filter__title"}>{TEXTS[context].filter.rating}</h3>
          <Tab text={'1'} isActive={false}>&#128528;</Tab>
          <Tab text={'2'} isActive={false}>&#128528;</Tab>
          <Tab text={'3'} isActive={false}>&#129320;</Tab>
          <Tab text={'4'} isActive={false}>&#128523;</Tab>
          <Tab text={'5'} isActive={false}>&#129321;</Tab>
        </div>
        <div className={"filter__quantity filter__section"}>
          <h3 className={"filter__title"}>{TEXTS[context].filter.ingr}</h3>
          <ManagedTab text='' max={20} placeholder={ph} type={"number"} isActive={true} name={"quantity-filter"} />
        </div>
        <div className={"filter__isLiked filter__section"}>
          <h3 className={"filter__title"}>{TEXTS[context].filter.favourite}</h3>
          <CheckSwitch name={'isLiked'} color={'red'} />
        </div>
      </div>
    </section>
  );
};

export default Filter;
