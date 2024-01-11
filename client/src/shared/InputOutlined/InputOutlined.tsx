import React, {FC, useEffect, useRef, useState} from 'react';
import './InputOutlined.scss';

interface IInputOutlinedProps {
  name: string;
  values: undefined;
  onChange: (e) => void;
  placeholders: string[];
  isAnim: boolean;

}

const InputOutlined: FC<IInputOutlinedProps> = ({name, values, onChange, placeholders, isAnim}) => {

  // const [currPh, setCurrPh] = useState<string>(placeholders[0]);
  const [placeHolder, setPlaceHolder] = useState(isAnim ? '' : placeholders[0]);

  useEffect(() => {
    if (!isAnim) return; //Дропаем Effect чтобы убрать анимацию

    let i = 0;
    let j = 0;
    let ph = '';
    let isWaited = false;

    const inputPhEmit = setInterval(() => {
      if (j + 1 > placeholders.length) j = 0;
      if (isWaited) return; // Отключаем Interval на время Timeout

      if (i < placeholders[j].length) {
        ph += placeholders[j][i++];
      } else {
        isWaited = true;
        setTimeout(() => { // Запускаем Timeout на 5сек. чтобы прочесть что написано в PH
          const remover = setInterval(() => {
            if (!!i) {
              ph = ph.slice(0, i--);
            } else {
              isWaited = false;
              ph = '';
              j++;
              clearInterval(remover) // Дропаем удаление символов
            }
            setPlaceHolder(ph);
          }, 100)
        }, 5000)
      }

      setPlaceHolder(ph);
    }, 350)

    return () => {
      clearInterval(inputPhEmit);
    }

  }, [isAnim, placeholders])

  return (
    <input placeholder={`${placeHolder}`} type={'text'} className={"input input__outlined"} name={name} onChange={onChange} value={values?.[name]} />
  );
};

export default InputOutlined;
