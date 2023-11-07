const { Dogs, Temperament } = require("../db");
const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";
require("dotenv").config();
const { API_KEY } = process.env;

module.exports = async () => {
  const dogsApi = (await axios.get(`${URL}?api_key=${API_KEY}`)).data.map(
    (dog) => {
      return {
        name: dog.name,
        temperaments: dog.temperament,
        id: dog.id,
        life_span: dog.life_span,
        height: dog.height.metric,
        weight: dog.weight.metric,
        image: dog.image.url,
        created: false,
      };
    }
  );
  const dogsDB = await Dogs.findAll({
    include: {
      model: Temperament,
      through: { attributes: [] },
      attributes: ["name"],
    },
  });
  // console.log(dogsApi);
  console.log(dogsDB);

  const allDogs = [
    ...dogsDB.map((dog) => {
      return {
        name: dog.name,
        temperaments: !dog.temperaments.length
          ? "Not found"
          : dog.temperaments
              .map((temp) => `${temp.name},`)
              .join(" ")
              .slice(0, -1),
        id: dog.id,
        life_span: dog.life_span,
        height: dog.height,
        weight: dog.weight,
        image: dog.image,
        created: dog.created,
      };
    }),
    ...dogsApi,
  ];

  return allDogs;
};
