import style from "./FormPage.module.css";
import Form from "../../components/Form/Form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTemperaments } from "../../redux/actions";

const FormPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={style.form}>
      <div className={style.vector_r}></div>
      <div className={style.vector_d}></div>
      <Form />
    </div>
  );
};
export default FormPage;
