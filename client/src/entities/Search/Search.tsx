import React, {FC, useContext, useState} from 'react';
import './Search.scss';
import InputOutlined from "../../shared/InputOutlined/InputOutlined";
import useForm from "../../hooks/useForm";
import InputBtn from "../../shared/InputBtn/InputBtn";
import {TEXTS} from "../../constants";
import {LanguageContext} from "../../context/LanguageContext";


const Search: FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  const {inputValues, onChange} = useForm();
  const context = useContext(LanguageContext);

  const open = () => {
    setIsOpen(!isOpen)
  }

  return (
    <form className={"search"}>
      <InputOutlined isAnim={true} placeholders={TEXTS[context].inputph.search} name={"input-1"} value={inputValues} onChange={onChange} />
      <div className={"search__btns"}>
        <InputBtn extraClasses={"search__lupa"} />
        <InputBtn onClick={open} extraClasses={`search__filter ${isOpen ? 'search__filter_active' : ''}`} />
      </div>
    </form>
  );
};

export default Search;
