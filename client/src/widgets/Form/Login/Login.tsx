import React, {useContext} from 'react';
import CtrlBtn from "../../../shared/CtrlBtn/CtrlBtn";
import InputSign from "../../../shared/InputSign/InputSign";
import {TEXTS} from "../../../constants";
import {LanguageContext} from "../../../context/LanguageContext";

const Login = () => {

  const context = useContext(LanguageContext);

  return (
      <form className={"form-s"}>
        <InputSign
          type="email"
          name="userEmailLog"
          isBig={false}
          labelText={TEXTS[context].inputlabel.email}
          errorText=""
          placeholder={TEXTS[context].inputph.account.email}
        />

        <InputSign
          type="password"
          name="userPassLog"
          isBig={false}
          labelText={TEXTS[context].inputlabel.pass}
          errorText=""
          placeholder={TEXTS[context].inputph.account.pass}
        />

        <div className={"form-s__btns"}>
          <CtrlBtn extraClasses="form-s__auth" text="Registration"/>
          <CtrlBtn extraClasses="form-s__submit" text="Submit"/>
        </div>
      </form>
  );
};

export default Login;
