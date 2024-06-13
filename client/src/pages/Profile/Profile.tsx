import { FC, useContext, useState } from "react"
import InputSign from "../../shared/InputSign/InputSign";
import useForm from "../../hooks/useForm";
import { LanguageContext } from "../../context/LanguageContext";
import { TEXTS } from "../../constants";
import { useAppSelector } from "../../hooks/useAppRedux";
import './Profile.scss';
import CtrlBtn from "../../shared/CtrlBtn/CtrlBtn";
import UserType from "../../Types/UserType";

const Profile: FC = () => {

  const {onChange, inputValues} = useForm();
  const context = useContext(LanguageContext);
  const {user} = useAppSelector(state => state.user);
  const checkedUser = user as UserType;
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const phs = TEXTS[context].inputph.account as Record<string, string>;

  const changeEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(!isEdit);
  }

  

  return (
    <form className="form-s profile">
      <InputSign 
      value={inputValues['profile-name'] ? inputValues['profile-name'] : checkedUser.name}
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
      value={inputValues['profile-mail'] ? inputValues['profile-mail'] : checkedUser.email}
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
        value={inputValues['profile-pass']}
        name="profile-pass"
        onChange={onChange}
        type="password"
        isBig={false}
        labelText={TEXTS[context].inputlabel.passcheck}
        placeholder={phs.passcheck} 
        />
        </>
      }
      
      <div className="form-s__btns">
        {
          isEdit ? 
          <>
          <CtrlBtn onClick={changeEdit} text={TEXTS[context].btns.change} extraClasses="form-s__passchange" />
          <CtrlBtn onClick={(e) =>{e.preventDefault()}} extraClasses="form-s__submit" text={TEXTS[context].btns.submit}/>
          </>
          : 
          <>
          <CtrlBtn onClick={changeEdit} text={TEXTS[context].btns.edit} extraClasses="form-s__edit" />
          <CtrlBtn onClick={(e) =>{e.preventDefault()}} extraClasses="form-s__exit" text={TEXTS[context].btns.exit}/>
          </> 
        }
      </div>
    </form>
  )
}

export default Profile;