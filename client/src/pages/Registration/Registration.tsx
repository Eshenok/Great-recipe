import { useContext } from "react";
import './Registration.scss';
import { TEXTS } from "../../constants";
import Title from "../../shared/Title/Title";
import { LanguageContext } from "../../context/LanguageContext";
import InputSign from "../../shared/InputSign/InputSign";
import CtrlBtn from "../../shared/CtrlBtn/CtrlBtn";

const Registration = () => {

    const context = useContext(LanguageContext);

    return (
      <section className="registration">
            <Title text={TEXTS[context].titles.profile} />
            <form onSubmit={(e) => {e.preventDefault()}} className="registration__form">
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

                <div className="registration__btns">
                    <CtrlBtn extraClasses="registration__back" text="Login"/>
                    <CtrlBtn extraClasses="registration__submit" text="Submit"/>
                </div>
            </form>
        </section>
    );
};

export default Registration;