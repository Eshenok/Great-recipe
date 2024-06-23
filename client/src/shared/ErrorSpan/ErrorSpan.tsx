import { FC } from "react";
import './ErrorSpan.scss';

interface IErrorSpanProps {
  text: string,
  extraClasses?: string
}

const ErrorSpan: FC<IErrorSpanProps> = ({text, extraClasses}) => {
  return (
    <span className={`error-span ${extraClasses}`}>{text}</span>
  )
}

export default ErrorSpan;