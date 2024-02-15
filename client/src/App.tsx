import './App.css'
import './commonStyles/Animations.scss';
import './vendor/fonts/fonts.css';
import './widgets/Form/Form.scss';
import {useEffect, useState} from "react";
import {LanguageContext} from "./context/LanguageContext";
import {useDispatch} from "react-redux";
import {initCategories} from "./store/categorySlice";
import Sign from "./pages/Sign/Sign";
import Header from './widgets/Header/Header';
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Main from './pages/Main/Main';

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
      <Header onSwapLanguage={changeLanguage} />
      <div className='content'>
        <div className='content__bg'/>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route path="/sign-*">
            <Sign />
          </Route>
        </Switch>
      </div>
    </LanguageContext.Provider>

  )
}

export default App
