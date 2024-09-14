import {FC, useContext, useEffect } from 'react';
import './Search.scss';
import InputOutlined from "../../shared/InputOutlined/InputOutlined";
import useForm from "../../hooks/useForm";
import InputBtn from "../../shared/InputBtn/InputBtn";
import {TEXTS} from "../../constants";
import {LanguageContext} from "../../context/LanguageContext";
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { changeFilterQueryValue } from '../../store/FilterSlice';

interface ISearchProps {
  isOpen: boolean;
  onOpen: () => void;
  clipped?: boolean;
  onSubmit: () => void;
}

const Search: FC<ISearchProps> = ({isOpen, onOpen, clipped, onSubmit}) => {

  const {inputValues, onChange, onPut} = useForm();
  const dispatch = useAppDispatch();
  const context = useContext(LanguageContext);
  const {search} = useAppSelector(state => state.filter);
  const phs = TEXTS[context].inputph.search as string[];

  useEffect(() => {
    onPut("input-search",search);
  }, [search])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    dispatch(changeFilterQueryValue({name: 'search', value: e.target.value}))
  }

  return (
    <form className={"search"} onSubmit={(e) => {e.preventDefault()}}>
      <InputOutlined isAnim={true} placeholders={phs} name="input-search" values={inputValues} onChange={handleChange} />
      <div className={"search__btns"}>
        <InputBtn onClick={onSubmit} extraClasses={"search__lupa"} />
        {!clipped && <InputBtn onClick={onOpen} extraClasses={`search__filter ${isOpen ? 'search__filter_active' : ''}`} />}
      </div>
    </form>
  );
};

export default Search;
