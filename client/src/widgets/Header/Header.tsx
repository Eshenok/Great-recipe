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
  const cardSection = document.querySelector('.cards');

  useEffect(() => {
    if (!cardSection) return;

    const checkScroll = () => {
      setIsShowedBackLink(!!cardSection.scrollTop && cardSection.scrollTop > 200);
      console.log(cardSection.scrollTop);
    }
    setIsShowedBackLink(!!cardSection.scrollTop && cardSection.scrollTop > 200);

    cardSection.addEventListener('scroll', checkScroll);

    return function cleanup() {
      cardSection.removeEventListener('scroll', checkScroll)}
  }, [cardSection, location.pathname]);

  useEffect(() => {
    setIsOpenHeader(false);
    if (location.pathname.includes('/profile') || location.pathname.includes('sign')) {
      setIsShowedBackLink(true);
    }
  }, [location.pathname]);

  const handleSubburgerClick = () => {
    if (location.pathname.includes('/profile') || location.pathname.includes('sign')) {
      navigate(-1);
    } else {
      if (cardSection) {
        cardSection.scrollTop = 0;
      }
    }
  }

  return (
    <>
      <header
        className={`header ${isOpenHeader ? 'header_open' : ''} ${location.pathname.includes('/fridge') ? 'header_blue' : location.pathname.includes('/profile') || location.pathname.includes('sign')  ? 'header_green' : 'header_orange'}`}
      >
        <Burger onClick={openHeader} extraClasses='header__burger'/>
        <SubBurger onClick={handleSubburgerClick} isShowed={isShowedBackLink} extraClasses={`header__subburger ${location.pathname.includes('/profile') || location.pathname.includes('sign') ? '':'sub-burger__top'}`} />
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
