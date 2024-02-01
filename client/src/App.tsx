import './App.css'
import './commonStyles/Animations.scss';
import './vendor/fonts/fonts.css';
import {useEffect, useState} from "react";
import {LanguageContext} from "./context/LanguageContext";
import useForm from "./hooks/useForm";
import {useDispatch} from "react-redux";
import {initCategories} from "./store/categorySlice";
import Main from "./pages/Main/Main";
import InputSign from "./shared/InputSign/InputSign";
import CtrlBtn from './shared/CtrlBtn/CtrlBtn';
import Registration from './pages/Registration/Registration';


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
      {/*<Main onSwapLanguage={changeLanguage} />*/}
      {/* <InputSign
          isBig={true}
          type={'text'}
          errorText={''}
          name={'user-name'}
          placeholder={'UserName'}
          labelText={'Name'}
      />
      <InputSign
          isBig={false}
          type={'email'}
          errorText={''}
          name={'user-email'}
          placeholder={'Email'}
          labelText={'Email'}
      />
      <InputSign
          isBig={false}
          type={'password'}
          errorText={''}
          name={'user-pass'}
          placeholder={'Password'}
          labelText={'Password'}
      />
      <CtrlBtn text='Submit' extraClasses='control-button__submit'/> */}
      <Registration />
    </LanguageContext.Provider>

  )
}

export default App
