import {FC, useContext, useEffect} from 'react';
import './Sign.scss';
import Title from "../../shared/Title/Title";
import {LanguageContext} from "../../context/LanguageContext";
import {TEXTS} from "../../constants";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppRedux';

const Sign: FC = () => {

  const context = useContext(LanguageContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {user} = useAppSelector(state => state.user);

  const titlePath = location.pathname === '/sign/in' ? 'login' : location.pathname === '/sign/up' ? 'reg' : 'profile';

  useEffect(() => {
    // Проверяем, если пользователь не аутентифицирован и находится на пути /sign
    if (!user) {
      navigate('/sign/in', {replace: true});
    } else {
      if (location.pathname.includes('/pass')) {
        navigate('/sign/profile/pass', {replace: true});
      } else {
        navigate('/sign/profile', {replace: true});
      }
    }
  }, [user, navigate]);

  return (
    <section className={"auth"}>
      <div className={"auth__white"}>
        <Title text={TEXTS[context].titles[titlePath]} />
        <div className={"auth__form"}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Sign;
