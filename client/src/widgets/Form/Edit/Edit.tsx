import {useContext} from 'react';
import {LanguageContext} from "../../../context/LanguageContext";
import InputSign from "../../../shared/InputSign/InputSign";
import {TEXTS} from "../../../constants";
import CtrlBtn from "../../../shared/CtrlBtn/CtrlBtn";

const Edit = () => {

  const context = useContext(LanguageContext);

  const phs = TEXTS[context].inputph.account as Record<string, string>

  return (
    <form onSubmit={(e) => {e.preventDefault()}} className="form-s">
      <InputSign
        type="text"
        name="userNameEdit"
        isBig={true}
        labelText={TEXTS[context].inputlabel.name}
        errorText=""
        placeholder={phs.name}
      />

      <InputSign
        type="email"
        name="userEmailEdit"
        isBig={false}
        labelText={TEXTS[context].inputlabel.email}
        errorText=""
        placeholder={phs.email}
      />

      <div className="form-s__btns">
        <CtrlBtn extraClasses="form-s__login" text="Login"/>
        <CtrlBtn extraClasses="form-s__submit" text="Submit"/>
      </div>
    </form>
  );
};

export default Edit;
