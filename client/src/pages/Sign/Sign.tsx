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
  const {user} = useAppSelector(state => state.user)

  useEffect(() => {
    // Проверяем, если пользователь не аутентифицирован и находится на пути /sign
    if (location.pathname.startsWith('/sign')) {
      if (Object.keys(user).length === 0) {
        if (location.pathname !== '/sign/in' && location.pathname !== '/sign/up') {
          navigate('/sign/in');
        }
      } else {
        if (location.pathname !== '/sign/profile') {
          navigate('/sign/profile');
        }
      }
    }
  }, [user, location.pathname, navigate]);

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
