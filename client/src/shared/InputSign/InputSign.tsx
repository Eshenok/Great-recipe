import {ChangeEvent, FC} from 'react';
import './InputSign.scss';
import useForm from "../../hooks/useForm";

interface IInputSignProps {
    type: string;
    placeholder: string;
    errorText: string;
    labelText?: string;
    name: string;
    isBig: boolean;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    req?: boolean;
}

const InputSign: FC<IInputSignProps> = ({type, placeholder, errorText, labelText, name, isBig, value, onChange, req}) => {

    return (
        <div className={`input-sign ${isBig ? 'input-sign_big' : ''}`}>
            <input
            required={req}
                className={`input input-sign__input ${errorText ? 'input-sign__input_err' : ''}`}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
            />
            {labelText &&
              <label
                htmlFor={name}
                className={`input-sign__label ${errorText ? 'input-sign__label_err' : ''}`}>
                  {errorText ? errorText : labelText}
              </label>
            }
        </div>

    );
};

export default InputSign;