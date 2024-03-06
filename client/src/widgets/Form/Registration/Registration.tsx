import { useContext } from "react";
import { TEXTS } from "../../../constants";
import { LanguageContext } from "../../../context/LanguageContext";
import InputSign from "../../../shared/InputSign/InputSign";
import CtrlBtn from "../../../shared/CtrlBtn/CtrlBtn";
import {Link} from 'react-router-dom';

const Registration = () => {

    const context = useContext(LanguageContext);

    return (
      <form onSubmit={(e) => {e.preventDefault()}} className="form-s">
        <InputSign
          type="text"
          name="userName"
          isBig={true}
          labelText={TEXTS[context].inputlabel.name}
          errorText=""
          placeholder={TEXTS[context].inputph.account.name}
        />

        <InputSign
          type="email"
          name="userEmail"
          isBig={false}
          labelText={TEXTS[context].inputlabel.email}
          errorText=""
          placeholder={TEXTS[context].inputph.account.email}
        />

        <InputSign
          type="password"
          name="userPass"
          isBig={false}
          labelText={TEXTS[context].inputlabel.pass}
          errorText=""
          placeholder={TEXTS[context].inputph.account.pass}
        />

        <InputSign
          type="password"
          name="userPassChecker"
          isBig={false}
          labelText={TEXTS[context].inputlabel.passcheck}
          errorText="" placeholder={TEXTS[context].inputph.account.passcheck}
        />

        <div className="form-s__btns">
          <CtrlBtn extraClasses="form-s__login">
            <Link to='/sign-in'>{TEXTS[context].btns.log}</Link>
          </CtrlBtn>
          <CtrlBtn extraClasses="form-s__submit" text={TEXTS[context].btns.submit}/>
        </div>
      </form>
    );
};

export default Registration;
