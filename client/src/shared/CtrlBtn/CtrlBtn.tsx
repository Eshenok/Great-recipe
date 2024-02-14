import React, { FC, ReactNode } from "react";
import './CtrlBtn.scss';

interface ICtrlBtnProps {
    text?: string;
    extraClasses?: string;
    onClick?: () => void;
    children?: ReactNode;
}

const CtrlBtn: FC<ICtrlBtnProps> = ({text, extraClasses, onClick, children}) => {
    return (
        <button onClick={onClick} className={`animated-btn control-button button ${extraClasses ?? ''}`}>
            {children}
            {text}
            <div className="control-button__icon" />
        </button>
    );
}

export default CtrlBtn;