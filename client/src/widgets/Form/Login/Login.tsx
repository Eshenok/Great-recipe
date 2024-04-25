import {useContext, MouseEvent} from 'react';
import CtrlBtn from "../../../shared/CtrlBtn/CtrlBtn";
import InputSign from "../../../shared/InputSign/InputSign";
import {TEXTS} from "../../../constants";
import {LanguageContext} from "../../../context/LanguageContext";
import { Form, Link } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import UserType from '../../../Types/UserType';
import { useDispatch } from 'react-redux';
import { signIn } from './Api/SignIn';

const Login = () => {

  const context = useContext(LanguageContext);

  const {inputValues, onChange} = useForm();
  const dispatch = useDispatch();

  const submitSignIn = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const formData: {email: string, password: string} = {
      "email": inputValues.userEmailLog,
      "password": inputValues.userPassLog,
    };

    dispatch(signIn(formData));
  }

  const phs = TEXTS[context].inputph.account as Record<string, string>

  return (
      <form className={"form-s"}>
        <InputSign
        value={inputValues["userEmailLog"]}
        onChange={onChange}
          type="email"
          name="userEmailLog"
          isBig={false}
          labelText={TEXTS[context].inputlabel.email}
          errorText=""
          placeholder={phs.email}
        />

        <InputSign
        value={inputValues["userPassLog"]}
        onChange={onChange}
          type="password"
          name="userPassLog"
          isBig={false}
          labelText={TEXTS[context].inputlabel.pass}
          errorText=""
          placeholder={phs.pass}
        />

        <div className={"form-s__btns"}>
          <CtrlBtn onClick={(e) =>{e.preventDefault()}} extraClasses="form-s__auth">
            <Link to={'/sign/up'}>{TEXTS[context].btns.reg}</Link>
          </CtrlBtn>
          <CtrlBtn onClick={submitSignIn} extraClasses="form-s__submit" text={TEXTS[context].btns.submit}/>
        </div>
      </form>
  );
};

export default Login;
