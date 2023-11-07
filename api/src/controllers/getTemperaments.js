const { Temperament } = require("../db");
const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";
require("dotenv").config();
const { API_KEY } = process.env;

module.exports = async () => {
  const { data } = await axios.get(`${URL}?api_key=${API_KEY}`);
  data.forEach((dog) => {
    if (dog.temperament) {
      dog.temperament.split(",").forEach(async (temp) => {
        // console.log(temp, 234, temp.trim());
        await Temperament.findOrCreate({ where: { name: temp.trim() } });
        //   console.log(temp.join(" "));
      });
    }
  });
  const tempera = await Temperament.findAll();
  // console.log(tempera);
  if (tempera) {
    return tempera;
  }
  //   console.log(dogs.length);

  return { error: "nuse" };
};
