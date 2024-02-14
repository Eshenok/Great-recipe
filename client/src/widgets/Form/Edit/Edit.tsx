import React, {useContext} from 'react';
import {LanguageContext} from "../../../context/LanguageContext";
import InputSign from "../../../shared/InputSign/InputSign";
import {TEXTS} from "../../../constants";
import CtrlBtn from "../../../shared/CtrlBtn/CtrlBtn";

const Edit = () => {

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

      <div className="form-s__btns">
        <CtrlBtn extraClasses="form-s__login" text="Login"/>
        <CtrlBtn extraClasses="form-s__submit" text="Submit"/>
      </div>
    </form>
  );
};

export default Edit;
