import './Footer.scss';

const Footer = () => {

  const currentData = new Date();

  return (
    <footer className={"footer"}>
      <div className={"footer__links"}>
        <a href={'https://github.com/Eshenok'} target={'_blank'} className={"footer__link footer__link_gh"} />
        <a href={'mailto:voloshin.alexandr@proton.me'} target={'_blank'} className={"footer__link footer__link_mail"}/>
      </div>
      <div className={"footer__copy"}>
        <p className={"footer__text"}>{currentData.getFullYear()}</p>
        <p className={"footer__text"}>&copy;BydLovesk Team</p>
      </div>
    </footer>
  );
};

export default Footer;
