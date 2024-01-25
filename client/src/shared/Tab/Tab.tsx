import {FC, useState} from 'react';
import '../Tab_new/Tab.scss';
import useForm from "../../hooks/useForm";

interface ITabProps {
  text: string;
  editable: boolean;
  type: string;
  smile?:string;
  active?: boolean;
}

const Tab: FC<ITabProps> = ({text, children, editable, type, smile, isActive}) => {

  const {inputValues, onChange, dropValue} = useForm();
  const [defaultValue, setDefaultValue] = useState(text);

  const handleSwapValue = () => setDefaultValue(defaultValue === text ? '' : defaultValue);
  const handleReturnDefault = (isDrop) => setDefaultValue(isDrop || inputValues[text] === '' || !inputValues[text] ? text : '');

  return (
    <div className={`tab ${isActive ? 'tab_active' : ''}`}>
      <p className={"tab__text"}>
        {
          editable &&
          <>
            <input
              style={{width: `${inputValues[text] ? inputValues[text].length : text.length - 1}ch`}}
              onFocus={handleSwapValue}
              onBlur={handleReturnDefault}
              value={inputValues[text] ? inputValues[text] : defaultValue}
              className={"tab__input input"}
              name={text}
              onChange={onChange}
              type={!inputValues[text] ? 'text' : type}
            />
            <button className={"tab__close-btn animated-btn"} onClick={() => {dropValue(text); handleReturnDefault(true)}} />
          </>
        }
        {!editable && text}
        {smile}
      </p>
      {children}
    </div>
  );
};

export default Tab;
