import { Router } from 'express';
import { createNewUser, getAllUsers, getUserById } from './../../controllers/user.controller';
import { verifyExtended, verifyNewUser } from './../../middlewares/user.middleware';


const router = Router();

router.get("/users", getAllUsers)
router.get("/users/:idUser/:extended?", verifyExtended, getUserById)
router.post("/users", verifyNewUser, createNewUser);

export default router;