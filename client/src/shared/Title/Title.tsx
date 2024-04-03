import {FC} from 'react';
import './Title.scss';

interface ITitleProps {
  text: string;
}

const Title: FC<ITitleProps> = ({text}) => {
  return (
    <h2 className={"title"}>{text}</h2>
  );
};

export default Title;
