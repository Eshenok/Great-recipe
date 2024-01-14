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


function App() {

  const [language, setLanguage] = useState<'en'|'ru'>('en');
  const dispatch = useDispatch();

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
      {/*<Tab text={'apple'} onClose={() => {console.log('clicked')}} />*/}
      {/*<div style={{heigth: '100%', padding: '20px 20px', backgroundColor: '#333'}}>*/}
      {/*  <LanguageSwap onSwap={changeLanguage}/>*/}
      {/*</div>*/}
      {/*<Menu />*/}
      {/*<Header onSwapLanguage={changeLanguage} />*/}
      {/*<InputOutlined isAnim={true} placeholders={TEXTS[language].inputph.search} name={"input-1"} value={inputValues} onChange={onChange} />*/}
      <Search />
      <Category />
      <RecipeCard recipeInfo={TEST_RECIPE}/>
    </LanguageContext.Provider>

  )
}

export default App
