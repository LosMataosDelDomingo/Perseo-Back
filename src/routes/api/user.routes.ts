import { Router } from 'express';
import { addWorkExperience, createNewUser, getAllUsers, getUserById, deleteWorkExperience, updateWorkExperience, getWorkExperience, updateUser, deleteUser } from './../../controllers/user.controller';
import { verifyExtended, verifyNewUser } from './../../middlewares/user.middleware';
import { verifyNewWork } from './../../middlewares/workExperience.middleware';


const router = Router();

router.get("/users", getAllUsers)
router.get("/users/:idUser/:extended?", verifyExtended, getUserById)
router.post("/users", verifyNewUser, createNewUser);
router.patch("/users", updateUser);
router.delete("/users", deleteUser);


router.get("/work/:userID", getWorkExperience);
router.post("/work", verifyNewWork, addWorkExperience);
router.delete("/work", deleteWorkExperience);
router.patch("/work", updateWorkExperience);


export default router;