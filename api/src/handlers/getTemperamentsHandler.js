const getTemperaments = require("../controllers/getTemperaments");
module.exports = async (req, res) => {
  try {
    const temp = await getTemperaments();
    if (temp.error) {
      throw Error(temp.error);
    }
    res.status(220).json(temp);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
