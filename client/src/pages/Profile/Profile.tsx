import { FC, useCallback, useContext, useEffect, useState } from "react"
import InputSign from "../../shared/InputSign/InputSign";
import useForm from "../../hooks/useForm";
import { LanguageContext } from "../../context/LanguageContext";
import { TEXTS } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppRedux";
import './Profile.scss';
import CtrlBtn from "../../shared/CtrlBtn/CtrlBtn";
import UserType from "../../Types/UserType";
import { signOut } from "./Api/SignOut";
import { updateUser } from "./Api/UpdateUser";
import ErrorSpan from "../../shared/StatusSpan/StatusSpan";
import { dropStatus } from "../../store/userSlice";

const Profile: FC = () => {

  const {onChange, inputValues} = useForm();
  const context = useContext(LanguageContext);
  const {user} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const checkedUser = user as UserType;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const {status} = useAppSelector(state => state.user);

  const phs = TEXTS[context].inputph.account as Record<string, string>;

  const changeEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(dropStatus())
    setIsEdit(!isEdit);
  }

  const logoff = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(signOut());
  }

  const handleUpdateUser = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToUpdate = {
      email: checkedUser.email,
      pass: inputValues['profile-pass'],
      nEmail: inputValues['profile-mail'],
      name: inputValues['profile-name']
    }

    dispatch(updateUser(dataToUpdate));
  }, [inputValues])

  useEffect(() => {
    if (status.error !== null) {
      dispatch(dropStatus());
    }
  }, [inputValues])
  

  return (
    <form className="form-s profile" onSubmit={handleUpdateUser}>
      <InputSign 
      value={isEdit ? inputValues['profile-name'] : checkedUser.name}
      name={'profile-name'}
      onChange={onChange}
      type="text"
      isBig={true}
      disabled={!isEdit}
      errorText=""
      placeholder={phs.name}
      labelText={TEXTS[context].inputlabel.name}
      />
      <InputSign 
      value={isEdit ? inputValues['profile-mail'] : checkedUser.email}
      name={'profile-mail'}
      onChange={onChange}
      type="email"
      isBig={false}
      disabled={!isEdit}
      errorText=""
      placeholder={phs.name}
      labelText={TEXTS[context].inputlabel.email}
      />
      {
        isEdit && <><InputSign
        errorText=""
        value={inputValues['profile-pass'] ? inputValues['profile-pass'] : ''}
        name="profile-pass"
        onChange={onChange}
        type="password"
        isBig={false}
        labelText={TEXTS[context].inputlabel.passcheck}
        placeholder={phs.passcheck} 
        />
        <button className="button profile__close animated-btn" onClick={changeEdit} />
        <ErrorSpan status={!status.error} text={`${status.error !== null ? TEXTS[context].reses[status.msg] : ''}`} />
        </>
      }
      
      <div className="form-s__btns">
        {
          isEdit ? 
          <>
          <CtrlBtn onClick={changeEdit} text={TEXTS[context].btns.change} extraClasses="form-s__passchange" />
          <CtrlBtn extraClasses="form-s__submit" text={TEXTS[context].btns.submit}/>
          </>
          : 
          <>
          <CtrlBtn onClick={changeEdit} text={TEXTS[context].btns.edit} extraClasses="form-s__edit" />
          <CtrlBtn onClick={logoff} extraClasses="form-s__exit" text={TEXTS[context].btns.exit}/>
          </> 
        }
      </div>
    </form>
  )
}

export default Profile;