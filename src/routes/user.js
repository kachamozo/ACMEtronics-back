const { Router } = require("express");
const router = Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
  getUserByEmail,
} = require("../controllers/user");

router.get("/", getAllUsers);

router.post("/email", getUserByEmail);

router.post("/", createUser);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
