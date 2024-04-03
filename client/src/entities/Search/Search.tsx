import {FC, useContext } from 'react';
import './Search.scss';
import InputOutlined from "../../shared/InputOutlined/InputOutlined";
import useForm from "../../hooks/useForm";
import InputBtn from "../../shared/InputBtn/InputBtn";
import {TEXTS} from "../../constants";
import {LanguageContext} from "../../context/LanguageContext";

interface ISearchProps {
  isOpen: boolean;
  onOpen: () => void;
}

const Search: FC<ISearchProps> = ({isOpen, onOpen}) => {

  const {inputValues, onChange} = useForm();
  const context = useContext(LanguageContext);
  const phs = TEXTS[context].inputph.search as string[];

  return (
    <form className={"search"} onSubmit={(e) => {e.preventDefault()}}>
      <InputOutlined isAnim={true} placeholders={phs} name={"input-1"} values={inputValues} onChange={onChange} />
      <div className={"search__btns"}>
        <InputBtn onClick={() => {console.log('search')}} extraClasses={"search__lupa"} />
        <InputBtn onClick={onOpen} extraClasses={`search__filter ${isOpen ? 'search__filter_active' : ''}`} />
      </div>
    </form>
  );
};

export default Search;
