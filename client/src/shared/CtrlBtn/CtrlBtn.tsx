import { FC, ReactNode, MouseEvent } from "react";
import './CtrlBtn.scss';

interface ICtrlBtnProps {
    text?: string;
    extraClasses?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    children?: ReactNode;
}

const CtrlBtn: FC<ICtrlBtnProps> = ({text, extraClasses, onClick, children}, props) => {
    return (
        <button {...props} onClick={onClick} className={`animated-btn control-button button ${extraClasses ?? ''}`}>
            {children}
            {text}
            <div className="control-button__icon" />
        </button>
    );
}

export default CtrlBtn;