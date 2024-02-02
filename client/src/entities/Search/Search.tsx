import React, {FC, useContext, useState} from 'react';
import './Search.scss';
import InputOutlined from "../../shared/InputOutlined/InputOutlined";
import useForm from "../../hooks/useForm";
import InputBtn from "../../shared/InputBtn/InputBtn";
import {TEXTS} from "../../constants";
import {LanguageContext} from "../../context/LanguageContext";


const Search: FC = ({isOpen, onOpen}) => {

  const {inputValues, onChange} = useForm();
  const context = useContext(LanguageContext);

  return (
    <form className={"search"} onSubmit={(e) => {e.preventDefault()}}>
      <InputOutlined isAnim={true} placeholders={TEXTS[context].inputph.search} name={"input-1"} value={inputValues} onChange={onChange} />
      <div className={"search__btns"}>
        <InputBtn extraClasses={"search__lupa"} />
        <InputBtn onClick={onOpen} extraClasses={`search__filter ${isOpen ? 'search__filter_active' : ''}`} />
      </div>
    </form>
  );
};

export default Search;
