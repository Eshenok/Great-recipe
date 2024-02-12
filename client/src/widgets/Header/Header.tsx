import React, {FC, useState} from 'react';
import './Header.scss';
import Menu from "../../entities/Menu/Menu";
import LanguageSwap from "../../shared/LanguageSwap/LanguageSwap";
import Footer from "../../shared/Footer/Footer";
import Logo from "../../shared/Logo/Logo";
import { useLocation } from 'react-router-dom';
import Burger from '../../shared/Burger/Burger';

interface IHeaderProps {
  onSwapLanguage: (type: 'en'|'ru') => void;
}

const Header: FC<IHeaderProps> = ({onSwapLanguage}) => {

  const location = useLocation();
  const [isOpenHeader, setIsOpenHeader] = useState(false);

  const openHeader = () => setIsOpenHeader(!isOpenHeader);

  return (
    <>
    <header
        className={`header ${isOpenHeader ? 'header_open' : ''} ${location.pathname.includes('/fridge') ? 'header_blue' : location.pathname.includes('/profile') ? 'header_green' : 'header_orange'}`}
      >
        <Burger onClick={openHeader}/>
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
