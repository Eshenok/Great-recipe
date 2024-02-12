import React, {FC, useContext} from 'react';
import './Sign.scss';
import Login from "../../widgets/Form/Login/Login";
import Registration from "../../widgets/Form/Registration/Registration";
import Title from "../../shared/Title/Title";
import {LanguageContext} from "../../context/LanguageContext";
import {TEXTS} from "../../constants";

interface ISignProps {
  route: 'sign-in' | 'sign-up';
}

const Sign: FC<ISignProps> = ({route}) => {

  const context = useContext(LanguageContext);

  return (
    <section className={"auth"}>
      <div className={"auth__white"}>
        <Title text={`${route === 'sign-up' ? TEXTS[context].titles.reg : TEXTS[context].titles.login}`} />
        <div className={"auth__form"}>
          {
            route === 'sign-up' && <Registration />
          }
          {
            route === 'sign-in' && <Login />
          }
        </div>
      </div>
    </section>
  );
};

export default Sign;
