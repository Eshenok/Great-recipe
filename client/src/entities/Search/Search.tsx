import React, {useState} from 'react';
import './Search.scss';
import InputOutlined from "../../shared/InputOutlined/InputOutlined";
import useForm from "../../hooks/useForm";
import InputBtn from "../../shared/InputBtn/InputBtn";


const Search = () => {

  const [isOpen, setIsOpen] = useState(false);
  const {inputValues, onChange} = useForm();

  const open = () => {
    setIsOpen(!isOpen)
  }

  console.log(isOpen);

  return (
    <div className={"search"}>
      <InputOutlined isAnim={true} placeholders={["Поиск по ингридиентам", 'Яблоко']} name={"input-1"} value={inputValues} onChange={onChange} />
      <div className={"search__btns"}>
        <InputBtn extraClasses={"search__lupa"} />
        <InputBtn onClick={open} extraClasses={`search__filter ${isOpen ? 'search__filter_active' : ''}`} />
      </div>
    </div>
  );
};

export default Search;
