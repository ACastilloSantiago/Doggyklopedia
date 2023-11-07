const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";
require("dotenv").config();
const { API_KEY } = process.env;
const { Dogs, Temperament } = require("../db");

const { Op } = require("sequelize");
// ME QUEDE CON VER SI LEE BIEN LA RAZA Y SE FIJA EN LA BASE DE DATOS JEJE. TERMINE VIENDO TEMA DE OPERADORES, CAPAS ES MAS FACIL ASI KJEJE

module.exports = async (raza) => {
  console.log(raza, 2);
  let razasDB = await Dogs.findAll({
    where: { name: { [Op.iLike]: `%${raza}%` } },

    include: {
      model: Temperament,
      through: { attributes: [] },
      attributes: ["name"],
    },
  });
  const razas = (
    await axios.get(`${URL}/search?q=${raza}&api_key=${API_KEY}`)
  ).data.map((dog) => {
    return {
      name: dog.name,
      temperaments: dog.temperament,
      id: dog.id,
      life_span: dog.life_span,
      height: dog.height.metric,
      weight: dog.weight.metric,
      image: dog.image?.url,
      created: false,
    };
  });

  if (razasDB.length && razas.length) {
    return [
      ...razas,
      ...razasDB.map((dog) => {
        console.log(dog);
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
    ];
  }
  if (razasDB.length) {
    return razasDB.map((dog) => {
      console.log(555, dog);

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
    });
  }
  if (razas.length) {
    return razas;
  }

  return { error: "No existe la raza que esta indicando" };
};
