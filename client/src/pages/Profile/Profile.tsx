import { FC, useContext, useState } from "react"
import InputSign from "../../shared/InputSign/InputSign";
import useForm from "../../hooks/useForm";
import { LanguageContext } from "../../context/LanguageContext";
import { TEXTS } from "../../constants";
import { useAppSelector } from "../../hooks/useAppRedux";
import './Profile.scss';
import CtrlBtn from "../../shared/CtrlBtn/CtrlBtn";

const Profile: FC = () => {

  const {onChange, inputValues} = useForm();
  const context = useContext(LanguageContext);
  const {user} = useAppSelector(state => state.user);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const phs = TEXTS[context].inputph.account as Record<string, string>

  return (
    <form className="form-s profile">
      <InputSign 
      value={inputValues['profile-name'] ? inputValues['profile-name'] : user?.name}
      name={'profile-name'}
      onChange={onChange}
      type="text"
      isBig={true}
      disabled={!isEdit}
      errorText=""
      placeholder={phs.name}
      />
      <InputSign 
      value={inputValues['profile-mail'] ? inputValues['profile-mail'] : user?.email}
      name={'profile-mail'}
      onChange={onChange}
      type="email"
      isBig={false}
      disabled={!isEdit}
      errorText=""
      placeholder={phs.name}
      />
      <div className="form-s__btns">
      <CtrlBtn onClick={(e) =>{e.preventDefault()}} extraClasses="form-s__auth"></CtrlBtn>
          <CtrlBtn extraClasses="form-s__exit" text={TEXTS[context].btns.exit}/>
      </div>
    </form>
  )
}

export default Profile;