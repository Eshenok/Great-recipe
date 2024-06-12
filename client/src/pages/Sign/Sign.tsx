import {FC, useContext, useEffect} from 'react';
import './Sign.scss';
import Login from "../../widgets/Form/Login/Login";
import Registration from "../../widgets/Form/Registration/Registration";
import Title from "../../shared/Title/Title";
import {LanguageContext} from "../../context/LanguageContext";
import {TEXTS} from "../../constants";
import { Outlet, redirect, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sign: FC = () => {

  const context = useContext(LanguageContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      navigate('/sign/in');
    } else {
      navigate('/sign/profile')
    }
  }, [])

  const getTitle = (path: string): string => {
    return TEXTS[context].titles[path === '/sign/in' ? 'login' : path === '/sign/up' ? 'reg' : 'profile'];
  }

  return (
    <section className={"auth"}>
      <div className={"auth__white"}>
        <Title text={getTitle(location.pathname)} />
        <div className={"auth__form"}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Sign;
