const getDogsByID = require("../controllers/getDogsByID");
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const dog = await getDogsByID(id);

    if (dog.error) {
      throw Error(dog.error);
    }
    res.status(201).json(dog);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
