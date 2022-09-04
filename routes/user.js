const router = require("express").Router();
const { getUsers, getUserById, createUser, patchProfile, patchAvatar } = require("../controllers/user");

router.get("/", getUsers);

router.get("/:userId", getUserById);

router.post("/", createUser);

router.patch("/me" , patchProfile);

router.patch("/me/avatar", patchAvatar);

module.exports = router;
