import {useContext, MouseEvent} from 'react';
import CtrlBtn from "../../../shared/CtrlBtn/CtrlBtn";
import InputSign from "../../../shared/InputSign/InputSign";
import {TEXTS} from "../../../constants";
import {LanguageContext} from "../../../context/LanguageContext";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import { signIn } from './Api/SignIn';
import { useAppDispatch } from '../../../hooks/useAppRedux';

const Login = () => {

  const context = useContext(LanguageContext);

  const {inputValues, onChange} = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitSignIn = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const formData: {email: string, password: string} = {
      "email": inputValues.userEmailLog,
      "password": inputValues.userPassLog,
    };

    dispatch(signIn(formData));
    // navigate('/sign/profile');
  }

  const phs = TEXTS[context].inputph.account as Record<string, string>

  return (
      <form className={"form-s"}>
        <InputSign
          req={true}
        value={inputValues["userEmailLog"] ? inputValues["userEmailLog"] : ''}
        onChange={onChange}
          type="email"
          name="userEmailLog"
          isBig={false}
          labelText={TEXTS[context].inputlabel.email}
          errorText=""
          placeholder={phs.email}
        />

        <InputSign
          req={true}
        value={inputValues["userPassLog"] ? inputValues["userPassLog"] : ''}
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
