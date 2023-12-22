import {FC, useContext, useState} from 'react';
import './LanguageSwap.scss';
import {LanguageContext} from "../../context/LanguageContext";

interface ILanguageSwapProps {
  onSwap: (type: 'en'|'ru') => void;
}

const LanguageSwap: FC<ILanguageSwapProps> = ({onSwap}) => {

  const [isOpen, setIsOpen] = useState(false);
  const language = useContext(LanguageContext);

  const openDD = () => setIsOpen(!isOpen)

  return (
    <div onClick={openDD} className={"lng-swap"}>
      <div className={"lng-swap__head"}>
        <span className={"lng-swap__planet"}/>
        <p className={"lng-swap__text lng-swap__dd-text"}>{language === 'en' ? 'English' : 'Русский'}</p>
        <span className={`lng-swap__arrow ${isOpen ? 'lng-swap__arrow_open' : ''}`}/>
      </div>
      <div className={`lng-swap__dd ${isOpen ? 'lng-swap__dd_open' : ''}`}>
        <p className={"lng-swap__text lng-swap__text_lng"} onClick={() => {onSwap('en')}}>English</p>
        <p className={"lng-swap__text lng-swap__text_lng"} onClick={() => {onSwap('ru')}}>Русский</p>
      </div>
    </div>
  );
};

export default LanguageSwap;
