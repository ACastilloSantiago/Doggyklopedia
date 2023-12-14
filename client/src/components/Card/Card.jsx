import style from "./Card.module.css";
import { Link } from "react-router-dom";
const Card = ({ name, life_span, weight, temperament, id, image }) => {
  if (name) {
    return (
      // <main className={style.main}>
      <Link to={`/detail/${id}`} className={style.card}>
        {/* <div className={style.mainCard} key={id}> */}
        <div className={style.card__images}>
          <img src={image} alt={name} className={style.card__image} />
        </div>
        <div className={style.card__texts}>
          <h3 className={style.card__title}>{name}</h3>
          <h4 className={style.card__subtitle}> Peso:</h4>
          <span className={style.card__span}> {weight} kg.</span>
          <h4 className={style.card__subtitle}>Temperamentos:</h4>
          <span className={style.card__span}>{temperament}</span>
        </div>
      </Link>
      // </main>
    );
  } else {
    <img src="https://httpstatusdogs.com/img/404.jpg" alt="" />;
  }
};

export default Card;
