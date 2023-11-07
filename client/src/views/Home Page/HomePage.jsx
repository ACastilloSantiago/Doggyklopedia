import CardContainer from "../../components/CardContainer/CardContainer";
import style from "./HomePage.module.css";

const HomePage = () => {
  // const dogShow = useSelector((state) => state.dogs_Show);

  return (
    <div className={style.home}>
      {/* <h1>Mostrando Home Page</h1> */}
      {/* <NavBar /> */}
      <CardContainer />
    </div>
  );
};
export default HomePage;
