import {ChangeEvent, FC} from 'react';
import './InputSign.scss';

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
    disabled?: boolean;
    dfValue?: string;
}

const InputSign: FC<IInputSignProps> = ({type, placeholder, errorText, labelText, name, isBig, value, onChange, req, disabled, dfValue}) => {

    return (
        <div className={`input-sign ${isBig ? 'input-sign_big' : ''}`}>
            <input
            defaultValue={dfValue}
            autoComplete={type === 'password' ? 'off' : undefined}
            required={req}
                className={`input input-sign__input ${errorText ? 'input-sign__input_err' : ''}`}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
            />
            {labelText && !disabled &&
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