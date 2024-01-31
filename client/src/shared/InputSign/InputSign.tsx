import React, {useRef} from 'react';
import './InputSign.scss';
import useForm from "../../hooks/useForm";

const InputSign = ({type, placeholder, errorText, labelText, name, isBig}) => {

    const {inputValues, onChange} = useForm();

    return (
        <div className={`input-sign ${isBig ? 'input-sign_big' : ''}`}>
            <input
                className={`input input-sign__input ${errorText ? 'input-sign__input_err' : ''}`}
                name={name}
                id={name}
                value={inputValues[name]}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
            />
            {labelText &&
              <label
                htmlFor={name}
                className={"input-sign__label"}>
                  {errorText ? errorText : labelText}
              </label>
            }
        </div>

    );
};

export default InputSign;