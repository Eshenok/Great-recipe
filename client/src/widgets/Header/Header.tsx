import React from 'react';
import './Header.scss';
import Menu from "../../entities/Menu/Menu";
import LanguageSwap from "../../shared/LanguageSwap/LanguageSwap";
import Footer from "../../shared/Footer/Footer";
import Logo from "../../shared/Logo/Logo";
import { useLocation } from 'react-router-dom';

const Header = ({onSwapLanguage}) => {

  const location = useLocation();

  return (
    <header
      className={`header ${location.pathname.includes('/fridge') ? 'header_blue' : location.pathname.includes('/profile') ? 'header_green' : 'header_orange'}`}
    >
      <LanguageSwap extraClasses={"header__lng"} onSwap={onSwapLanguage} />
      <div className={"header__menu"}>
        <Logo />
        <Menu />
      </div>
      <Footer />
    </header>
  );
};

export default Header;
