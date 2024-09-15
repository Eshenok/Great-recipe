import { FC, useContext } from "react";
import { Link, useRouteError } from "react-router-dom";
import './NotFound.scss';
import nficon from '../../assets/nf-icon.svg';
import { LanguageContext } from "../../context/LanguageContext";
import { TEXTS } from "../../constants";

const NotFound: FC = () => {

  const error = useRouteError();
  const context = useContext(LanguageContext);
  const infoText = TEXTS[context].info;
  console.error(error);

  return (
    <section className="not-found">
      <div className="not-found__main">
        <h3 className="not-found__title">{TEXTS[context].titles.nf}</h3>
        <h2 className="not-found__err">404</h2>
        <img className="not-found__icon" src={nficon} />
      </div>
      <aside className="not-found__aside">
        <article className="not-found__pgh">
          <h4 className="not-found__subtitle">{infoText.nfWhatHappens}</h4>
          <p className="not-found__text">{infoText.nfWhatHappensTxt}</p>
        </article>
        <h4 className="not-found__good">{infoText.nfGood}</h4>
        <article className="not-found__pgh">
          <h4 className="not-found__subtitle">{infoText.nfWhatToDo}</h4>
          <p className="not-found__text">
            {infoText.nfWhatToDoTxtFH}
            <Link className="not-found__link" to={'/'}>{infoText.nfWhatToDoLinkF}</Link>
            {infoText.nfWhatToDoTxtLH}
          </p>
          <p className="not-found__text">
            {infoText.nfWhatToDoTxtLFH}
            <a href={'mailto:alexandr@voloshin-home.ru'} target={'_blank'} className="not-found__link">{infoText.nfWhatToDoLinkL}</a>
            {infoText.nfWhatToDoTxtLLH}
          </p>
        </article>
      </aside>
    </section>
  )
}

export default NotFound;