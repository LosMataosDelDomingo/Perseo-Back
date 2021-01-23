import { Router } from 'express';
import { createNewUser, getAllUsers } from './../../controllers/user.controller';
import { verifyNewUser } from './../../middlewares/user.middleware';


const router = Router();

router.get("/users", getAllUsers)
router.post("/users", verifyNewUser, createNewUser);

export default router;