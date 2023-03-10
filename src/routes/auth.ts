import{Request,Response,Router}from "express";
import { registerCtrl,loginCtrl } from "../controllers/user";
import { logMiddleware } from "../middleware/log";

const router=Router();
/** http://localhost:3002/auth/register */
router.post("/register",logMiddleware,registerCtrl);
router.post("/login",loginCtrl);

export{router};
