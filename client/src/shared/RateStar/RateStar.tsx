import { FC } from "react"
import './RateStar.scss';

interface IRateStarProps {
  isActive?: boolean;
  id: string;
  name: string;
  isChecked: boolean;
  onChange: (e) => void;
  value: any
}

const RateStar: FC<IRateStarProps> = ({isActive, id, name, isChecked, onChange, value}) => {

  return (
    <div className={`ratestar ${isActive ? 'ratestar_active' : ''}`}>
      <input className="ratestar__input" value={value} type="radio" id={id} name={name} checked={isChecked} onChange={onChange} />
      <label className={`ratestar__label`} htmlFor={id}>
        <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.2407 0.64728L19.106 8.84951C19.2925 9.24511 19.6722 9.51189 20.1039 9.56198L29.2681 10.6255C29.5047 10.653 29.5656 10.9153 29.4185 11.0484L22.6432 17.1812C22.3192 17.4745 22.171 17.9153 22.2583 18.3454L24.0568 27.2049C24.0938 27.3873 23.8842 27.5841 23.6657 27.4644L15.613 23.0525C15.2317 22.8436 14.7683 22.8436 14.387 23.0525L6.33429 27.4644C6.11579 27.5841 5.90617 27.3873 5.94318 27.2049L7.7417 18.3454C7.82902 17.9153 7.68083 17.4745 7.35684 17.1812L7.0213 17.5519L7.35684 17.1812L0.581495 11.0484C0.434443 10.9153 0.495273 10.653 0.731917 10.6255L9.89614 9.56198C10.3278 9.51189 10.7075 9.24511 10.894 8.84951L14.7593 0.647281C14.8518 0.450907 15.1482 0.450906 15.2407 0.64728Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </label>
    </div>
  )
}

export default RateStar