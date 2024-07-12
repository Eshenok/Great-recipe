import {useContext, useEffect, useState} from 'react';
import {LanguageContext} from "../../../context/LanguageContext";
import InputSign from "../../../shared/InputSign/InputSign";
import {TEXTS} from "../../../constants";
import CtrlBtn from "../../../shared/CtrlBtn/CtrlBtn";
import useForm from '../../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppRedux';
import UserType from '../../../Types/UserType';
import { useNavigate } from 'react-router-dom';
import ErrorSpan from "../../../shared/StatusSpan/StatusSpan";
import { updateUserPass } from './Api/UpdateUserPass';
import { dropStatus } from '../../../store/userSlice';

const EditPass = () => {

  const context = useContext(LanguageContext);
  const dispatch = useAppDispatch();

  const [validateError, setValidateError] = useState('');
  const {inputValues, onChange} = useForm();
  const {user, status} = useAppSelector(state => state.user);
  // const {status} = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const checkedUser = user as UserType;

  console.log(inputValues);

  const phs = TEXTS[context].inputph.account as Record<string, string>

  useEffect(() => {
    setValidateError('')
    dispatch(dropStatus());
  }, [inputValues])

  const validateFormPass = () => {
    if (inputValues['userPassEditNew'] !== inputValues['userPassCheckerEditNew']) {
      setValidateError(TEXTS[context].info.checkPassErr);
      return true;
    }
  }

  const handleUpdatePassword = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFormPass()) return;
    const dataToUpdate = {
      email: checkedUser.email,
      oldPassword: inputValues['userPassEditOld'],
      newPassword: inputValues['userPassEditNew']
    }
    dispatch(updateUserPass(dataToUpdate));
  }

  return (
    <form onSubmit={handleUpdatePassword} className="profile form-s">
      <InputSign
        value={checkedUser.name}
        onChange={onChange}
        req={true}
        disabled={true}
        type="text"
        name="userNameEdit"
        isBig={true}
        labelText={TEXTS[context].inputlabel.name}
        errorText=""
        placeholder={phs.name}
      />

      <InputSign
      req={true}
        value={checkedUser.email}
        onChange={onChange}
        disabled={true}
        type="email"
        name="userEmailEdit"
        isBig={false}
        labelText={TEXTS[context].inputlabel.email}
        errorText=""
        placeholder={phs.email}
      />

      <InputSign
        req={true}
        value={inputValues['userPassEditOld'] ? inputValues['userPassEditOld'] : ''}
        onChange={onChange}
        type="password"
        name="userPassEditOld"
        isBig={false}
        labelText={TEXTS[context].inputlabel.oldPass}
        errorText=""
        placeholder={phs.pass}
      />

      <InputSign
        req={true}
        value={inputValues['userPassEditNew'] ? inputValues['userPassEditNew'] : ''}
        onChange={onChange}
        type="password"
        name="userPassEditNew"
        isBig={false}
        labelText={TEXTS[context].inputlabel.newPass}
        errorText={validateError}
        placeholder={phs.pass}
      />

      <InputSign
        req={true}
        value={inputValues['userPassCheckerEditNew'] ? inputValues['userPassCheckerEditNew'] : ''}
        onChange={onChange}
        type="password"
        name="userPassCheckerEditNew"
        isBig={false}
        labelText={TEXTS[context].inputlabel.passcheck}
        errorText={validateError} 
        placeholder={phs.passcheck}
      />
      <button className="button profile__close animated-btn" onClick={(e) => {e.preventDefault(); navigate('/sign/profile')}} />
      <ErrorSpan status={!status.error} text={`${status.error !== null ? TEXTS[context].reses[status.msg] : ''}`} />

      <div className="form-s__btns">
        <CtrlBtn onClick={(e) => {e.preventDefault(); navigate('/sign/profile')}} extraClasses="form-s__login" text={TEXTS[context].btns.back}/>
        <CtrlBtn extraClasses="form-s__submit" text={TEXTS[context].btns.submit}/>
      </div>
    </form>
  );
};

export default EditPass;
