import "./App.css";
import LandingPage from "./views/Landing Page/LandingPage";
import DetailPage from "./views/Detail Page/DetailPage";
import HomePage from "./views/Home Page/HomePage";
import FormPage from "./views/Form Page/FormPage";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "./redux/actions";
import { useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_URL_API;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]); // se pone el dispatch en el array de depencia porque puede pasar que cargue de mala manera
  const location = useLocation().pathname;
  return (
    <section id="App">
      {location !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/creator" element={<FormPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </section>
  );
}

export default App;
