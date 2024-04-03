import {FC} from 'react';
import './LikeBtn.scss';

interface ILikeBtnProps {
  extraClasses?: string;
  onClick: () => void;
  isLiked: boolean;
}

const LikeBtn: FC<ILikeBtnProps> = ({extraClasses, onClick, isLiked}) => {
  return (
    <button className={`button like ${extraClasses ?? ''} ${isLiked ? 'like_active' : ''}`} onClick={onClick} />
  );
};

export default LikeBtn;
