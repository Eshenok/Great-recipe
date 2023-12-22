import {FC} from 'react';
import './Tab.scss';

interface ITabProps {
  text: string;
  onClose: () => void;
}

const Tab: FC<ITabProps> = ({text, onClose}) => {
  return (
    <div className={"tab"}>
      <p className={"tab__text"}>{text}</p>
      <button className={"tab__close-btn"} onClick={onClose} />
    </div>
  );
};

export default Tab;
