import style from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={style.main}>
      <img
        className={style.img}
        src="https://dogs-pi-spa.netlify.app/static/media/loading.918e8310.gif"
        alt="Loading"
      />
      {/* <button onClick={reset}>reset</button> */}
    </div>
  );
};

export default Loading;
