import { Router } from 'express';
import { createNewUser } from './../../controllers/user.controller';
import { verifyNewUser } from './../../middlewares/user.middleware';


const router = Router();

router.post("/users", verifyNewUser, createNewUser);

export default router;