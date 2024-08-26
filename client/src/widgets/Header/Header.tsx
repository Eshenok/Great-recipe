import {FC, useEffect, useState} from 'react';
import './Header.scss';
import Menu from "../../entities/Menu/Menu";
import LanguageSwap from "../../shared/LanguageSwap/LanguageSwap";
import Footer from "../../shared/Footer/Footer";
import Logo from "../../shared/Logo/Logo";
import { useLocation, useNavigate } from 'react-router-dom';
import Burger from '../../shared/Burger/Burger';
import SubBurger from '../../shared/SubBurger/SubBurger';

interface IHeaderProps {
  onSwapLanguage: (type: 'en'|'ru') => void;
}

const Header: FC<IHeaderProps> = ({onSwapLanguage}) => {

  const location = useLocation();
  const [isOpenHeader, setIsOpenHeader] = useState(false);
  const [isShowedBackLink, setIsShowedBackLink] = useState(false);
  const navigate = useNavigate();
  const openHeader = () => setIsOpenHeader(!isOpenHeader);

  useEffect(() => {
    const cardSection = document.querySelector('.cards');
    if (!cardSection) return;

    const checkScroll = () => {
      setIsShowedBackLink(!!cardSection.scrollTop);
      console.log(cardSection.scrollTop);
    }

    cardSection.addEventListener('click', checkScroll);

    return (
      cardSection.removeEventListener('scroll', checkScroll)
    )

  }, []);

  return (
    <>
      <header
        className={`header ${isOpenHeader ? 'header_open' : ''} ${location.pathname.includes('/fridge') ? 'header_blue' : location.pathname.includes('/profile') || location.pathname.includes('sign')  ? 'header_green' : 'header_orange'}`}
      >
        <Burger onClick={openHeader} extraClasses='header__burger'/>
        <SubBurger onClick={() => navigate(-1)} isShowed={true} extraClasses={`header__subburger`} />
        <LanguageSwap extraClasses={"header__lng"} onSwap={onSwapLanguage} />
        <div className={"header__menu"}>
          <Logo />
          <Menu />
        </div>
        <Footer />
      </header>

      <div className={`header__overlay ${isOpenHeader ? 'header__overlay_open' : ''}`} onClick={openHeader} />
    </>


  );
};

export default Header;
