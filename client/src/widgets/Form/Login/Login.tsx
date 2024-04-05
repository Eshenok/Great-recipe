import {useContext} from 'react';
import CtrlBtn from "../../../shared/CtrlBtn/CtrlBtn";
import InputSign from "../../../shared/InputSign/InputSign";
import {TEXTS} from "../../../constants";
import {LanguageContext} from "../../../context/LanguageContext";
import { Form, Link } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import UserType from '../../../Types/UserType';

const Login = () => {

  const context = useContext(LanguageContext);

  const {inputValues} = useForm();

  

  const phs = TEXTS[context].inputph.account as Record<string, string>

  return (
      <Form method='POST' className={"form-s"}>
        <InputSign
          type="email"
          name="userEmailLog"
          isBig={false}
          labelText={TEXTS[context].inputlabel.email}
          errorText=""
          placeholder={phs.email}
        />

        <InputSign
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
          <CtrlBtn extraClasses="form-s__submit" text={TEXTS[context].btns.submit}/>
        </div>
      </Form>
  );
};

export default Login;
