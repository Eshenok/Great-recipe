import React, {FC, useContext} from 'react';
import './Sign.scss';
import Login from "../../widgets/Form/Login/Login";
import Registration from "../../widgets/Form/Registration/Registration";
import Title from "../../shared/Title/Title";
import {LanguageContext} from "../../context/LanguageContext";
import {TEXTS} from "../../constants";
import { Redirect, useLocation } from 'react-router-dom';

const Sign: FC = () => {

  const context = useContext(LanguageContext);
  const location = useLocation();
  const login = false;

  return (
    <section className={"auth"}>
      <div className={"auth__white"}>
        <Title text={TEXTS[context].titles[location.pathname === '/sign-in' ? 'login' : location.pathname === '/sign-up' ? 'reg' : 'profile']} />
        <div className={"auth__form"}>
          {
            login && <Redirect to='/profile' />
          }
          {
            location.pathname === '/sign-up' && <Registration />
          }
          {
            location.pathname === '/sign-in' && <Login />
          }
        </div>
      </div>
    </section>
  );
};

export default Sign;
