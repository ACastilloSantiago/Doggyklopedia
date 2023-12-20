import style from "./FormPage.module.css";
import Form from "../../components/Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTemperaments } from "../../redux/actions";

const FormPage = () => {
  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temps);
  useEffect(() => {
    dispatch(getTemperaments());
  }, [temps]);
  return (
    <div className={style.form}>
      <div className={style.vector_r}></div>
      <div className={style.vector_d}></div>
      <Form temps={temps} />
    </div>
  );
};
export default FormPage;
