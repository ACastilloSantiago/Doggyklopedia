const { Dogs, Temperament } = require("../db");
module.exports = async (name, image, height, weight, life_span, temps) => {
  // console.log("s");
  if (name && image && height && weight && life_span && temps) {
    const created = await Dogs.create({
      name,
      image,
      height,
      weight,
      life_span,
    });
    temps.split(",").forEach(async (temperamento) => {
      const findTemp = await Temperament.findOne({
        where: { name: temperamento.trim() },
      });
      if (findTemp) {
        await created.addTemperament(findTemp);
      }
    });
    return { ...created.dataValues, temperaments: temps };
  } else return { error: "Faltan datos" };
};
