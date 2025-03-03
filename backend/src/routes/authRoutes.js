import express from 'express';
import { signUp, signIn ,getAllUsers,getUser,getCurrentUser,updateProfile} from '../controllers/authController.js';

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.put("/updateProfile/:userId", updateProfile);
router.get("/users", getAllUsers);
router.get("/user/:id", getUser);



export default router; 