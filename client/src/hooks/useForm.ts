import React, { useState } from "react";

const useForm = () => {
  const [inputValues, setInputValues] = useState({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValues({...inputValues, [target.name]: target.value});
  }

  const onSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValues({...inputValues, [target.name]: target.checked})
  }

  return {
    inputValues,
    onChange,
    onSwitch,
  };
};

export default useForm
