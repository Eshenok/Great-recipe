import React, {FC} from 'react';
import './Tab.scss';

interface ITabProps {
  text: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const Tab: FC<ITabProps> = ({text, children, isActive, onClick}) => {
  
  return (
    <div className={`tab ${isActive ? 'tab_active' : ''}`} onClick={onClick}>
      <p className={`tab__text ${children ? 'tab__text_icon' : ''}`}>{text}</p>
      {children}
    </div>
  );
};

export default Tab;
