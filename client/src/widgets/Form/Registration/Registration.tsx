import { FormEvent, FormEventHandler, useContext, useEffect, useState } from "react";
import { TEXTS } from "../../../constants";
import { LanguageContext } from "../../../context/LanguageContext";
import InputSign from "../../../shared/InputSign/InputSign";
import CtrlBtn from "../../../shared/CtrlBtn/CtrlBtn";
import {Link} from 'react-router-dom';
import useForm from "../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { signUp } from "./Api/SignUp";
import StatusSpan from "../../../shared/StatusSpan/StatusSpan";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppRedux";
import { dropStatus } from "../../../store/userSlice";

const Registration = () => {

    const context = useContext(LanguageContext);

    const {inputValues, onChange} = useForm();
    const [errorPassCheck, setErrorPassCheck] = useState('');
    const dispatch = useAppDispatch();
    const {status} = useAppSelector(state => state.user);


    const ph = TEXTS[context].inputph.account as Record<string, string>;

    const validatePass = (value1: string, value2: string): boolean => {
      if (value1 !== value2) {
        setErrorPassCheck('Парли не совпадают');
        return false
      } else {
        return true;
      }
    };

    const createUser = (e: FormEvent): void => {
      e.preventDefault();
      if (!validatePass(inputValues["userPass"], inputValues["userPassChecker"])) {
        return;
      }

      const formData = {
        email: inputValues["userEmail"],
        password: inputValues["userPass"],
        name: inputValues["userName"]
      }

      dispatch(signUp(formData))
    }

    useEffect(() => {
      dispatch(dropStatus())
    }, [])

    return (
      <form onSubmit={createUser} className="form-s">
        <InputSign
          req={true}
          type="text"
          name="userName"
          isBig={true}
          labelText={TEXTS[context].inputlabel.name}
          errorText=""
          placeholder={ph.name}
          onChange={onChange}
          value={inputValues["userName"]}
        />

        <InputSign
          req={true}
          type="email"
          name="userEmail"
          isBig={false}
          labelText={TEXTS[context].inputlabel.email}
          errorText=""
          placeholder={ph.email}
          onChange={onChange}
          value={inputValues["userEmail"]}
        />

        <InputSign
          req={true}
          type="password"
          name="userPass"
          isBig={false}
          labelText={TEXTS[context].inputlabel.pass}
          errorText=""
          placeholder={ph.pass}
          onChange={onChange}
          value={inputValues["userPass"]}
        />

        <InputSign
          req={true}
          type="password"
          name="userPassChecker"
          isBig={false}
          labelText={TEXTS[context].inputlabel.passcheck}
          errorText={errorPassCheck} placeholder={ph.passcheck}
          onChange={onChange}
          value={inputValues["userPassChecker"]}
        />
        <StatusSpan extraClasses='form-s__span' status={!status.error} text={`${status.error !== null ? TEXTS[context].reses[status.msg] : ''}`} />

        <div className="form-s__btns">
          <CtrlBtn extraClasses="form-s__login">
            <Link to='/sign/in'>{TEXTS[context].btns.log}</Link>
          </CtrlBtn>
          <CtrlBtn extraClasses="form-s__submit" text={TEXTS[context].btns.submit}/>
        </div>
      </form>
    );
};

export default Registration;
