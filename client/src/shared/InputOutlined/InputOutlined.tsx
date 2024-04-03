import {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import './InputOutlined.scss';

interface IInputOutlinedProps {
  name: string;
  values: Record<string, any>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholders: string[];
  isAnim: boolean;

}

interface Timers {
  inputPhEmit: number | undefined;
  remover: number | undefined;
  timeout: number | undefined;
}

const InputOutlined: FC<IInputOutlinedProps> = ({name, values, onChange, placeholders, isAnim}) => {

  const timersRef = useRef<Timers>({
    inputPhEmit: undefined,
    remover: undefined,
    timeout: undefined,
  }); // ref хранения интервалов, чтобы при смене языка они не дублировались
  const [placeHolder, setPlaceHolder] = useState(isAnim ? '' : placeholders[0]);

  useEffect(() => {
    if (!isAnim) return; //Дропаем Effect чтобы убрать анимацию

    let i = 0;
    let j = 0;
    let ph = '';
    let isWaited = false;

    timersRef.current.inputPhEmit = setInterval(() => {
      if (j + 1 > placeholders.length) j = 0;
      if (isWaited) return; // Отключаем Interval на время Timeout

      if (i < placeholders[j].length) {
        ph += placeholders[j][i++];
      } else {
        isWaited = true;
        timersRef.current.timeout = setTimeout(() => { // Запускаем Timeout на 5сек. чтобы прочесть что написано в PH
          timersRef.current.remover = setInterval(() => {
            if (!!i) {
              ph = ph.slice(0, i--);
            } else {
              isWaited = false;
              ph = '';
              j++;
              clearInterval(timersRef.current.remover!); // Дропаем удаление символов
            }
            setPlaceHolder(ph);
          }, 100)
        }, 5000)
      }

      setPlaceHolder(ph);
    }, 350)

    return () => {
      clearInterval(timersRef.current.inputPhEmit!);
      clearTimeout(timersRef.current.timeout!);
      clearInterval(timersRef.current.remover!);
    }

  }, [isAnim, placeholders])

  return (
    <input placeholder={`${placeHolder}`} type={'text'} className={"input input__outlined"} name={name} onChange={onChange} value={values?.[name]} />
  );
};

export default InputOutlined;
