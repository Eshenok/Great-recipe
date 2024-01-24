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

  const dropValue = (name) => {
    setInputValues({...inputValues, [name]: ''});
  }

  return {
    inputValues,
    onChange,
    onSwitch,
    dropValue,
  };
};

export default useForm
