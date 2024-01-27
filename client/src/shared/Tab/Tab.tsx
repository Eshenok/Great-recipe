import React, {FC} from 'react';
import './Tab.scss';

interface ITabProps {
  text: string;
  children: React.ReactNode;
  isActive: boolean;
}

const Tab: FC<ITabProps> = ({text, children, isActive}) => {
  return (
    <div className={`tab ${isActive ? 'tab_active' : ''}`}>
      <p className={"tab__text"}>{text}</p>
      {children}
    </div>
  );
};

export default Tab;
