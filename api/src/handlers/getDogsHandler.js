const getDogs = require("../controllers/getDogs");

module.exports = async (req, res) => {
  try {
    const dogs = await getDogs();

    res.status(202).json(dogs);
  } catch (error) {
    res.status(404).json("ripio coñaso");
  }
};
