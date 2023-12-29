import './App.css'
import {useState} from "react";
import {LanguageContext} from "./context/LanguageContext";
import InputOutlined from "./shared/InputOutlined/InputOutlined";
import useForm from "./hooks/useForm";


function App() {

  const [language, setLanguage] = useState<'en'|'ru'>('en');
  const {inputValues, onChange} = useForm();

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
      <InputOutlined placeholder={"placeHolder 123"} name={"input-1"} value={inputValues} onChange={onChange} />
    </LanguageContext.Provider>

  )
}

export default App
