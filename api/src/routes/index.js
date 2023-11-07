const { Router } = require("express");
const router = Router();
const getDogsHandler = require("../handlers/getDogsHandler");
const getDogsByIdHandler = require("../handlers/getDogsByIdHandler");
const getRazaHandler = require("../handlers/getRazaHandler");
const getTemperamentsHandler = require("../handlers/getTemperamentsHandler");
const postDogHandler = require("../handlers/postDogHandler");

router.get("/temperaments", getTemperamentsHandler);
router.get("/dogs", getDogsHandler);
router.get("/dogs/name", getRazaHandler);
router.post("/dogs", postDogHandler);
router.get("/dogs/:id", getDogsByIdHandler);
module.exports = router;
