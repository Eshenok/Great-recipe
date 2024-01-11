import './App.css'
import './commonStyles/Animations.scss';
import {useEffect, useState} from "react";
import {LanguageContext} from "./context/LanguageContext";
import InputOutlined from "./shared/InputOutlined/InputOutlined";
import useForm from "./hooks/useForm";
import InputBtn from "./shared/InputBtn/InputBtn";
import lupa from './assets/lupa.svg';
import Search from "./entities/Search/Search";


function App() {

  const [language, setLanguage] = useState<'en'|'ru'>('en');

  const changeLanguage = (lng) => {
    if (lng === 'en' || lng === 'ru') {
      setLanguage(lng);
    }
  }

  return (
    <LanguageContext.Provider value={language}>
      {/*<Tab text={'apple'} onClose={() => {console.log('clicked')}} />*/}
      {/*<div style={{heigth: '100%', padding: '20px 20px', backgroundColor: '#333'}}>*/}
      {/*  <LanguageSwap onSwap={changeLanguage}/>*/}
      {/*</div>*/}
      {/*<Menu />*/}
      {/*<Header onSwapLanguage={changeLanguage} />*/}
      {/*<InputOutlined isAnim={true} placeholders={["Поиск по ингридиентам", 'Яблоко']} name={"input-1"} value={inputValues} onChange={onChange} />*/}
      <Search />
    </LanguageContext.Provider>

  )
}

export default App
