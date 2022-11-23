import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { userSchemaValidation, signInBodyValidation} from "../middlewares/authValidation.middleware.js";
const router = Router();

router.post("/sign-up", userSchemaValidation, signUp)
router.post("/sign-in", signInBodyValidation, signIn)
router.post("/")

export default router;              