import React, {FC, useContext} from 'react';
import './Fridge.scss';
import Main from "../Main/Main";
import Title from "../../shared/Title/Title";
import {LanguageContext} from "../../context/LanguageContext";
import {TEXTS} from "../../constants";
import InputOutlined from "../../shared/InputOutlined/InputOutlined";
import useForm from "../../hooks/useForm";
import Tab from "../../shared/Tab/Tab";

const Fridge: FC = () => {

  const context = useContext(LanguageContext);
  const {onChange, inputValues} = useForm();

  const products = () => {
    const xdd = [];
    const products = ['Apple', 'Apple', 'Лютый Черный перец Чили', 'Картошка', 'Cucumber', 'Кукумбер'];
    products.forEach((item, i) => {
      xdd.push(<Tab text={item} key={i} isActive={false}>
        <button className={"animated-btn tab__remove-prd-btn"} onClick={() => {
          console.log('minus prod')}} />
      </Tab>)
    })
    return xdd;
  }

  return (
    <section className={"fridge"}>
      <div className={"fridge__bg"}>
        <div className={"fridge__white"}>

          <Title text={TEXTS[context].titles.fridge} />
          <InputOutlined
            name={'add-prod'}
            values={inputValues['add-prod']}
            onChange={onChange}
            placeholders={TEXTS[context].inputph.fridge}
            isAnim={false}
          />
          <div className={"fridge__products"}>
            {
              products()
            }
          </div>

        </div>
      </div>
      <Main />
    </section>
  );
};

export default Fridge;
