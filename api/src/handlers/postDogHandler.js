const postDog = require("../controllers/postDog");
module.exports = async (req, res) => {
  try {
    const { name, image, height, weight, life_span, temps } = req.body;

    const sure = await postDog(name, image, height, weight, life_span, temps);

    // if (sure.error) {
    //   throw Error(sure.error);
    // }
    res.status(210).send(sure);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
