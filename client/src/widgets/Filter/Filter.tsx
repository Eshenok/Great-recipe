import {FC, useContext, useEffect, useState} from 'react';
import './Filter.scss';
import Search from "../../entities/Search/Search";
import Tab from "../../shared/Tab/Tab";
import CheckSwitch from "../../shared/CheckSwitch/CheckSwitch";
import ManagedTab from "../../shared/ManagedTab/ManagedTab";
import {LanguageContext} from "../../context/LanguageContext";
import {TEXTS} from "../../constants";
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { findRecipesByKeys } from './Api/FindRecipes';
import { dropfindedRecipesStatus, setFindedRecipes } from '../../store/recipesSlice';
import FilterFetchDataType from '../../Types/FilterFetchData';
import { changeFilterQueryValue, selectFilter, syncWithLS } from '../../store/FilterSlice';

interface IFilterProps {
  clipped?: boolean;
  extraClasses?: string;
}

const Filter: FC<IFilterProps> = ({clipped, extraClasses}) => {

  const context = useContext(LanguageContext);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const [isOpen, setIsOpen] = useState(true);
  const [prevSearchesValue, setPrevSearchesValue] = useState<string[] | null>(JSON.parse(localStorage.getItem('search-query') as string));
  const ph = TEXTS[context].inputph.ings as string;

  const handleChooseUserRate = (value: number) => {
    dispatch(changeFilterQueryValue({name: 'userRate', value: value ? value !== filter.userRate ? value : '' : ''}));
  }

  const getPrevSearchesFromLS = (): string[] => {
    const prevSearches = localStorage.getItem('search-query');
    return prevSearches ? JSON.parse(prevSearches) : [];
  }

  function findRecipe () {
    const checkFilter = () => Object.values(filter).reduce((prev, curr) => {return Boolean(curr) || prev}, false);
    if (!checkFilter()) {
      dispatch(setFindedRecipes([]));
      dispatch(dropfindedRecipesStatus());
      return;
    }
    const keysForFind: string[] | null = !filter.search ? null : filter.search.replace(/[^a-zа-яё\s]/gi, ' ').replace(/\s+/g, ' ').split(' ');
    const dataToFetch: FilterFetchDataType = {ingredients: keysForFind, category: filter.category, liked: filter.isLiked, ingQuantity: Number(filter.quantity), userRating: filter.userRate};
    dispatch(findRecipesByKeys(dataToFetch));
  }

  const putPrevSearchQuery = (value: string) => {dispatch(changeFilterQueryValue({name: 'search', value}))}

  function handleSaveSearchInLS (value: string): void {
    if (!value || value.length <=2) return;
    const prevSearches = getPrevSearchesFromLS();
    const isEquals = prevSearches.find((elem: string) => elem === value);
    if(isEquals) return;
    prevSearches.unshift(value);
    if (prevSearches.length > 20) {
      prevSearches.pop();
    }
    setPrevSearchesValue(prevSearches);
    localStorage.setItem('search-query', JSON.stringify(prevSearches));
  }

  function removeSavedSearchFromLS (name: string): void {
    const prevSearches = getPrevSearchesFromLS().filter((item: string) => {return item !== name});
    setPrevSearchesValue(prevSearches);
    localStorage.setItem('search-query', JSON.stringify(prevSearches));
  }

  useEffect(() => {
    const filter = localStorage.getItem('filter');
    if (filter) {
      dispatch(syncWithLS(JSON.parse(filter)))
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSaveSearchInLS(filter.search);
      localStorage.setItem('filter', JSON.stringify(filter));
      findRecipe();
    }, 500)
    return function clear() {
      clearTimeout(timer);
    }
  }, [filter]);

  return (
    <section className={`filter ${extraClasses ? extraClasses : ''}`}>
      <div className={"filter__header"}>
        <Search onSubmit={findRecipe} clipped={clipped} isOpen={isOpen} onOpen={() => {setIsOpen(!isOpen)}} />
        <div className={"filter__prev"}>
          {
            prevSearchesValue && prevSearchesValue.map((item, i) => <Tab onClick={() => {putPrevSearchQuery(item)}} key={i} text={item}><button className={"tab__close-btn animated-btn"} onClick={() => {removeSavedSearchFromLS(item)}} /></Tab>)
          }
        </div>
      </div>
      {!clipped && <div className={`filter__bottom ${isOpen ? 'filter__bottom_open' : ''}`}>
        <div className={"filter__rating filter__section"}>
          <h3 className={"filter__title"}>{TEXTS[context].filter.rating}</h3>
          {
            [...Array(5)].map((_, i) => 
              <Tab text={String(i+1)} key={i} isActive={filter.userRate === i+1} onClick={() => {handleChooseUserRate(i+1)}}>
                {String.fromCodePoint(TEXTS[context].smiles[i+1])}
              </Tab>)
          }
        </div>
        <div className={"filter__quantity filter__section"}>
          <h3 className={"filter__title"}>{TEXTS[context].filter.ingr}</h3>
          <ManagedTab text='' max={20} placeholder={ph} type={"number"} isActive={true} name={"quantity-filter"} />
        </div>
        <div className={"filter__isLiked filter__section"}>
          <h3 className={"filter__title"}>{TEXTS[context].filter.favourite}</h3>
          <CheckSwitch checked={filter.isLiked}  name={'isLiked'} color={'red'} />
        </div>
      </div>}
    </section>
  );
};

export default Filter;
