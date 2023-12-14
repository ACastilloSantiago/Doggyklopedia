import style from "./Card.module.css";
import { Link } from "react-router-dom";
const Card = ({ name, life_span, weight, temperament, id, image }) => {
  if (name) {
    return (
      <main className={style.main}>
        <Link to={`/detail/${id}`} className={style.card}>
          {/* <div className={style.mainCard} key={id}> */}
          <img src={image} alt={name} className={style.card__image} />
          <div className={style.card__texts}>
            <h3 className={style.card__title}>{name}</h3>
            <span className={style.card__span}>Peso: {weight} kg.</span>
            <span className={style.card__span}>
              Temperamentos: {temperament}
            </span>
          </div>
        </Link>
      </main>
    );
  } else {
    <img src="https://httpstatusdogs.com/img/404.jpg" alt="" />;
  }
};

export default Card;
