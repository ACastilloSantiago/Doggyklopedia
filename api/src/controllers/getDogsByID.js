const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";
require("dotenv").config();
const { API_KEY } = process.env;
const { Dogs, Temperament } = require("../db");
const getDogs = require("../controllers/getDogs");

module.exports = async (id) => {
  if (id === "") {
    return "";
  }
  const dogs = await getDogs();

  const dog = isNaN(id)
    ? await Dogs.findByPk(id, {
        include: {
          model: Temperament,
          through: { attributes: [] },
          attributes: ["name"],
        },
      })
    : dogs.find((dog) => dog.id.toString() === id);

  if (dog && isNaN(id)) {
    console.log(1, "entro a if");
    console.log(1, dog.dataValues, "entro a if");

    let dogDb = [dog.dataValues];
    console.log(122, dogDb, "entro a if");

    dogDb = dogDb.map((dog) => {
      console.log(2, "entro a map");

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
    console.log(dogDb);
    return dogDb[0];
  }
  if (dog) {
    return dog;
  }
  return { error: "Not found" };
};
