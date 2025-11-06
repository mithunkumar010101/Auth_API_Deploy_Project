import express from "express";
import {register,login} from "../controllers/userController.js";
import {verifyToken} from "../middlewares/authMiddleware.js";


const router=express.Router();

router.post("/register",register);
router.post("/login",login);

router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Access granted ✅",
    userId: req.userId,
  });
});


export default router;

