import express from "express";
import { userSignUp } from "../controllers/userController.js";

const router = express.Router();

//POST
router.post("/signup", userSignUp);

export default router;
