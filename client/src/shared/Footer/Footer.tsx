import { useContext } from 'react';
import './Footer.scss';
import { LanguageContext } from '../../context/LanguageContext';

const Footer = () => {

  const currentData = new Date();
  const context = useContext(LanguageContext);

  return (
    <footer className={"footer"}>
      <div className={"footer__links"}>
        <a href={'https://github.com/Eshenok'} target={'_blank'} className={"footer__link footer__link_gh"} />
        <a href={'mailto:alexandr@voloshin-home.ru'} target={'_blank'} className={"footer__link footer__link_mail"}/>
      </div>
      <div className={"footer__copy"}>
        <p className={"footer__text"}>{currentData.getFullYear()}</p>
        <p className={"footer__text"}>&copy;Eshenok</p>
      </div>
    </footer>
  );
};

export default Footer;
