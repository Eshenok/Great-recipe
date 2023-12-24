import './App.css'
import {useState} from "react";
import {LanguageContext} from "./context/LanguageContext";
import Tab from "./shared/Tab/Tab";
import LanguageSwap from "./shared/LanguageSwap/LanguageSwap";
import Menu from "./entities/Menu/Menu";


function App() {

  const [language, setLanguage] = useState<'en'|'ru'>('en');

  const changeLanguage = (lng) => {
    if (lng === 'en' || lng === 'ru') {
      setLanguage(lng);
    }
  }

  return (
    <LanguageContext.Provider value={language}>
      <Tab text={'apple'} onClose={() => {console.log('clicked')}} />
      <div style={{heigth: '100%', padding: '20px 20px', backgroundColor: '#333'}}>
        <LanguageSwap onSwap={changeLanguage}/>
      </div>
      <Menu />
    </LanguageContext.Provider>

  )
}

export default App
