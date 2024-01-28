import './App.css'
import './commonStyles/Animations.scss';
import './vendor/fonts/fonts.css';
import {useEffect, useState} from "react";
import {LanguageContext} from "./context/LanguageContext";
import InputOutlined from "./shared/InputOutlined/InputOutlined";
import useForm from "./hooks/useForm";
import InputBtn from "./shared/InputBtn/InputBtn";
import lupa from './assets/lupa.svg';
import Search from "./entities/Search/Search";
import CheckSwitch from "./shared/CheckSwitch/CheckSwitch";
import {TEST_RECIPE, TEXTS} from "./constants";
import Category from "./entities/Category/Category";
import Header from "./widgets/Header/Header";
import {useDispatch} from "react-redux";
import {initCategories} from "./store/categorySlice";
import LikeBtn from "./shared/LikeBtn/LikeBtn";
import RecipeCard from "./entities/RecipeCard/RecipeCard";
import CardGrid from "./widgets/CardGrid/CardGrid";
import Tab from "./shared/Tab/Tab";
import Filter from "./widgets/Filter/Filter";
import Burger from "./shared/Burger/Burger";
import Menu from "./entities/Menu/Menu";
import Main from "./pages/Main/Main";


function App() {

  const [language, setLanguage] = useState<'en'|'ru'>('en');
  const dispatch = useDispatch();
  const {inputValues} = useForm();

  const changeLanguage = (lng) => {
    if (lng === 'en' || lng === 'ru') {
      setLanguage(lng);
    }
  }

  useEffect(() => {
    dispatch(initCategories({language: language}));
  }, [language])

  return (
    <LanguageContext.Provider value={language}>
      <Main onSwapLanguage={changeLanguage} />
    </LanguageContext.Provider>

  )
}

export default App
