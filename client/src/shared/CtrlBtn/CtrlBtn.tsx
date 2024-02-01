import React, { FC, ReactNode } from "react";
import './CtrlBtn.scss';

interface ICtrlBtnProps {
    text: string;
    extraClasses?: string;
}

const CtrlBtn: FC<ICtrlBtnProps> = ({text, extraClasses}) => {
    return (
        <button className={`animated-btn control-button button ${extraClasses ?? ''}`}>
            {text}
            <div className="control-button__icon" />
        </button>
    );
}

export default CtrlBtn;