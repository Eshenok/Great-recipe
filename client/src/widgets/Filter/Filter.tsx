import {FC, useContext, useEffect, useState} from 'react';
import './Filter.scss';
import Search from "../../entities/Search/Search";
import Tab from "../../shared/Tab/Tab";
import CheckSwitch from "../../shared/CheckSwitch/CheckSwitch";
import ManagedTab from "../../shared/ManagedTab/ManagedTab";
import {LanguageContext} from "../../context/LanguageContext";
import {TEXTS} from "../../constants";
import { useAppDispatch } from '../../hooks/useAppRedux';
import { findRecipesByKeys } from './Api/FindRecipes';
import { dropfindedRecipesStatus, setFindedRecipes } from '../../store/recipesSlice';

interface IFilterProps {
  clipped?: boolean;
  extraClasses?: string;
}

const Filter: FC<IFilterProps> = ({clipped, extraClasses}) => {

  const context = useContext(LanguageContext);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const ph = TEXTS[context].inputph.ings as string;

  const findRecipe = (value: string) => {
    if (value === '' || !value) {
      dispatch(setFindedRecipes([]));
      dispatch(dropfindedRecipesStatus());
      localStorage.setItem('filterQuery', '');
      return;
    }
    const keysForFind: string[] = value.replace(/[^a-zа-яё\s]/gi, ' ').replace(/\s+/g, ' ').split(' ');
    dispatch(findRecipesByKeys(keysForFind));
    localStorage.setItem('filterQuery', value);
  }

  return (
    <section className={`filter ${extraClasses ? extraClasses : ''}`}>
      <div className={"filter__header"}>
        <Search onSubmit={findRecipe} clipped={clipped} isOpen={isOpen} onOpen={() => {setIsOpen(!isOpen)}} />
        <div className={"filter__prev"}>
        </div>
      </div>
      {!clipped && <div className={`filter__bottom ${isOpen ? 'filter__bottom_open' : ''}`}>
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
      </div>}
    </section>
  );
};

export default Filter;
