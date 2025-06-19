const express = require("express");
const { createUser, userLogin } = require("../controller/userController");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Hi from Backend!");
});

// router.get("/users", getUsers);
// router.post("/users", addUsers);
router.post("/create-user", createUser);
router.post("/login", userLogin);

module.exports = router;
