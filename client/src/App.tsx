import './App.css'
import './commonStyles/Animations.scss';
import './vendor/fonts/fonts.css';
import './widgets/Form/Form.scss';
import {useEffect, useState} from "react";
import {LanguageContext} from "./context/LanguageContext";
import useForm from "./hooks/useForm";
import {useDispatch} from "react-redux";
import {initCategories} from "./store/categorySlice";
import Main from "./pages/Main/Main";
import InputSign from "./shared/InputSign/InputSign";
import CtrlBtn from './shared/CtrlBtn/CtrlBtn';
import Registration from './widgets/Form/Registration/Registration';
import Login from "./widgets/Form/Login/Login";
import Sign from "./pages/Sign/Sign";


function App() {

  const [language, setLanguage] = useState<'en'|'ru'>('en');
  const dispatch = useDispatch();

  const changeLanguage = (lng: 'en' | 'ru') => {
    if (lng === 'en' || lng === 'ru') {
      setLanguage(lng);
    }
  }

  useEffect(() => {
    dispatch(initCategories({language: language}));
  }, [language])

  return (
    <LanguageContext.Provider value={language}>
      {/*<Registration />*/}
      {/*<Login />*/}
      <Sign route={'sign-up'} />
    </LanguageContext.Provider>

  )
}

export default App
