import Loading from "../Loading/Loading";
import style from "./Detail.module.css";

const Detail = ({ detail }) => {
  if (!detail.name) {
    return <Loading />;
  } else {
    return (
      <div className={style.mainContenedor} key={detail.id}>
        <img src={detail?.image} alt={detail?.name} className={style.image} />
        <div className={style.detail}>
          <h1>{detail?.name}</h1>
          <h2>ID= {detail?.id}</h2>
          <h2>Altura= {detail?.height} cm.</h2>
          <h2>Peso= {detail?.weight} kg.</h2>
          <h2>Años de vida= {detail?.life_span}.</h2>
          <h2>Temperamentos= {detail?.temperaments}.</h2>
        </div>
      </div>
    );
  }
};
export default Detail;
