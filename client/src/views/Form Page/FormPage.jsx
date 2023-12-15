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
      <img
        src="../../../vector-form-up.svg"
        alt="vector-background-up"
        className={style.form__vector_up}
      />
      <img
        src="../../../vector-form-down.svg"
        alt="vector-background-down"
        className={style.form__vector_down}
      />
      <Form />
    </div>
  );
};
export default FormPage;
