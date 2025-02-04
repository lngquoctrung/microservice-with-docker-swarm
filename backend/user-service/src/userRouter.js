const express = require("express");
const userController = require("./userController");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/auth", userController.authUser);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);

module.exports = router;