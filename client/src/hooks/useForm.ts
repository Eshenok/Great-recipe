import React, { useState } from "react";

const useForm = () => {
  const [inputValues, setInputValues] = useState({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValues({...inputValues, [target.name]: target.value});
  }

  return {
    inputValues,
    onChange,
  };
};

export default useForm
