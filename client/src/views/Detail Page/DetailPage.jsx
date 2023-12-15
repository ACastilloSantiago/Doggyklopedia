import style from "./DetailPage.module.css";
import Detail from "../../components/Detail/Detail";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDogById } from "../../redux/actions";
import { useDispatch } from "react-redux";
const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDogById(id));
    return () => {
      dispatch(getDogById(""));
    };
  }, []);
  const dogById = useSelector((state) => state.dogId);
  // console.log("Detail Page", dogById);
  return (
    <div className={style.detailPage}>
      <img
        className={style.detailPage__vector}
        src="../../../vector-detail.svg"
        alt="vector-background"
      />
      <Detail detail={dogById} />
    </div>
  );
};
export default DetailPage;
