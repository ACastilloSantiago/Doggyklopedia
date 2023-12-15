import Loading from "../Loading/Loading";
import style from "./Detail.module.css";

const Detail = ({ detail }) => {
  if (!detail.name) {
    return <Loading />;
  } else {
    return (
      <article className={style.detail} key={detail.id}>
        <img
          src={detail?.image}
          alt={detail?.name}
          className={style.detail__image}
        />
        <div className={style.texts}>
          <h1 className={style.texts__title}>{detail?.name}</h1>
          <div>
            <span className={style.texts__titlespan}>ID:</span>
            <span className={style.texts__span}>{detail?.id}.</span>
          </div>
          <span className={style.texts__titlespan}>Altura:</span>
          <span className={style.texts__span}>{detail?.height} cm.</span>
          <div>
            <span className={style.texts__titlespan}>Peso:</span>
            <span className={style.texts__span}>{detail?.weight} kg.</span>
          </div>
          <span className={style.texts__titlespan}>Años de vida:</span>
          <span className={style.texts__span}>{detail?.life_span}.</span>
          <div>
            <span className={style.texts__titlespan}>Temperamentos:</span>
            <span className={style.texts__span}>{detail?.temperaments}.</span>
          </div>
        </div>
      </article>
    );
  }
};
export default Detail;
