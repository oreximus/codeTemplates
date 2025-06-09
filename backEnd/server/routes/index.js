const express = require("express");
const router = express.Router();
const { getUsers, addUsers } = require("../controller/userController");

router.get("/", (req, res, next) => {
  res.send("Hi from Backend!");
});

router.get("/users", getUsers);
router.post("/users", addUsers);

module.exports = router;
