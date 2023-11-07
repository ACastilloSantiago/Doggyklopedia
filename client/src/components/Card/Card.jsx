import style from "./Card.module.css";
import { Link } from "react-router-dom";
const Card = ({ name, life_span, weight, temperament, id, image }) => {
  // console.log(name);
  if (name) {
    return (
      <Link to={`/detail/${id}`} className={style.link}>
        <div className={style.mainCard} key={id}>
          <h3>{name}</h3>
          <img src={image} alt={name} className={style.image} />
          {/* <h2>Años de vida: {life_span}</h2> */}
          <h2>Peso: {weight} kg.</h2>
          <h2>Temperamentos: {temperament}</h2>
        </div>
      </Link>
    );
  } else {
    <img src="https://httpstatusdogs.com/img/404.jpg" alt="" />;
  }
};

export default Card;
