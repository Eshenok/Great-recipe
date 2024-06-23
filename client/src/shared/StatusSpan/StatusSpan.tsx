import { FC } from "react";
import './StatusSpan.scss';

interface IStatusSpanProps {
  text: string,
  extraClasses?: string,
  status: boolean | null
}

const StatusSpan: FC<IStatusSpanProps> = ({text, extraClasses, status}) => {
  return (
    <span className={`error-span ${status ? 'error-span__green' : ''} ${extraClasses}`}>{text}</span>
  )
}

export default StatusSpan;