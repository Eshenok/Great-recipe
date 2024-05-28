import {FC, useContext, useEffect, useRef } from 'react';
import './Search.scss';
import InputOutlined from "../../shared/InputOutlined/InputOutlined";
import useForm from "../../hooks/useForm";
import InputBtn from "../../shared/InputBtn/InputBtn";
import {TEXTS} from "../../constants";
import {LanguageContext} from "../../context/LanguageContext";

interface ISearchProps {
  isOpen: boolean;
  onOpen: () => void;
  clipped?: boolean;
  onSubmit: (value: string) => void;
}

const Search: FC<ISearchProps> = ({isOpen, onOpen, clipped, onSubmit}) => {

  const {inputValues, onChange} = useForm();
  const context = useContext(LanguageContext);
  const phs = TEXTS[context].inputph.search as string[];

  useEffect(() => {
    const filterQuery = localStorage.getItem('filterQuery');
    if (filterQuery) {
      inputValues['input-search'] = filterQuery;
      onSubmit(filterQuery);
    }
  }, [])

  return (
    <form className={"search"} onSubmit={(e) => {e.preventDefault()}}>
      <InputOutlined isAnim={true} placeholders={phs} name={"input-search"} values={inputValues} onChange={onChange} />
      <div className={"search__btns"}>
        <InputBtn onClick={() => {onSubmit(inputValues["input-search"])}} extraClasses={"search__lupa"} />
        {!clipped && <InputBtn onClick={onOpen} extraClasses={`search__filter ${isOpen ? 'search__filter_active' : ''}`} />}
      </div>
    </form>
  );
};

export default Search;
