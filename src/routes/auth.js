import express from "express";

const router = express.Router();

import AuthController from "../modules/controllers/authController.js";

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

const authRouter = router;

export default authRouter;
