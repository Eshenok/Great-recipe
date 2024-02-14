import React, {useContext} from 'react';
import {LanguageContext} from "../../../context/LanguageContext";
import InputSign from "../../../shared/InputSign/InputSign";
import {TEXTS} from "../../../constants";
import CtrlBtn from "../../../shared/CtrlBtn/CtrlBtn";

const EditPass = () => {

  const context = useContext(LanguageContext);

  return (
    <form onSubmit={(e) => {e.preventDefault()}} className="form-s">
      <InputSign
        type="text"
        name="userNameEdit"
        isBig={true}
        labelText={TEXTS[context].inputlabel.name}
        errorText=""
        placeholder={TEXTS[context].inputph.account.name}
      />

      <InputSign
        type="email"
        name="userEmailEdit"
        isBig={false}
        labelText={TEXTS[context].inputlabel.email}
        errorText=""
        placeholder={TEXTS[context].inputph.account.email}
      />

      <InputSign
        type="password"
        name="userPassEditOld"
        isBig={false}
        labelText={TEXTS[context].inputlabel.pass}
        errorText=""
        placeholder={TEXTS[context].inputph.account.pass}
      />

      <InputSign
        type="password"
        name="userPassEditNew"
        isBig={false}
        labelText={TEXTS[context].inputlabel.pass}
        errorText=""
        placeholder={TEXTS[context].inputph.account.pass}
      />

      <InputSign
        type="password"
        name="userPassCheckerEditNew"
        isBig={false}
        labelText={TEXTS[context].inputlabel.passcheck}
        errorText="" placeholder={TEXTS[context].inputph.account.passcheck}
      />

      <div className="form-s__btns">
        <CtrlBtn extraClasses="form-s__login" text="Login"/>
        <CtrlBtn extraClasses="form-s__submit" text="Submit"/>
      </div>
    </form>
  );
};

export default EditPass;
