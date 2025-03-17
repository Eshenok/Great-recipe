import {FC, FormEvent, useContext, useEffect, useState} from 'react';
import './Fridge.scss';
import Main from "../Main/Main";
import Title from "../../shared/Title/Title";
import {LanguageContext} from "../../context/LanguageContext";
import {TEXTS} from "../../constants";
import InputOutlined from "../../shared/InputOutlined/InputOutlined";
import useForm from "../../hooks/useForm";
import Tab from "../../shared/Tab/Tab";
import InputBtn from '../../shared/InputBtn/InputBtn';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { selectUser } from '../../store/userSlice';
import { updateFridge } from './Api/UpdateFridge';

const Fridge: FC = () => {

  const context = useContext(LanguageContext);
  const {onChange, inputValues, onPut} = useForm();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [fridge, setFridge] = useState<string[]>([]);

  const phs = TEXTS[context].inputph.fridge as string[];
  useEffect(() => {
    if (user) {
      setFridge(user.fridge);
    }
  }, [user]);

  function handleAddProduct (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputValues['add-prod']) return;
    dispatch(updateFridge([...new Set([...fridge, inputValues['add-prod']])]));
    onPut('add-prod', '');
  }

  function handleRemoveProduct (product: string) {
    const updatedFridge: string[] = fridge.filter(elem => elem !== product);
    dispatch(updateFridge([...new Set(updatedFridge)]));
  }

  const productsRender = () => {
    if (!user) return;
    const prods: Array<React.ReactNode> = [];

    fridge.forEach((elem, i) => {
      prods.push(
        <Tab text={elem} key={i} isActive={false}>
          <button className={"animated-btn tab__remove-prd-btn"} onClick={() => {handleRemoveProduct(elem)}} />
        </Tab>
      )
  })
  return prods;
  }

  return (
    <section className={"fridge"}>
      <div className={"fridge__bg"}>
        <div className={"fridge__white"}>

          <Title text={TEXTS[context].titles.fridge} />
          <form className='fridge__form' onSubmit={handleAddProduct}>
            <InputOutlined
              name={'add-prod'}
              values={inputValues}
              onChange={onChange}
              placeholders={phs}
              isAnim={false}
            />
            <div className='fridge__form_btns'>
              <InputBtn onClick={() => {console.log('yahay balya')}} extraClasses='fridge__add-btn' />
            </div>
          </form>
          <div className={"fridge__products"}>
            {
              productsRender()
            }
          </div>

        </div>
      </div>
      <Main />
    </section>
  );
};

export default Fridge;
