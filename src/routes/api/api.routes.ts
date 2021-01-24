// ** File for API routes **
import { Router } from 'express';
import { getEducation, updateEducation, addEducation, deleteEducation } from '../../controllers/education.controller';
import { createNewUser, getAllUsers, getUserById, getUserByEmail, updateUser, deleteUser } from '../../controllers/user.controller';
import { addWorkExperience, deleteWorkExperience, getWorkExperience, updateWorkExperience } from '../../controllers/workExperience.controller';
import { verifyExtended, verifyNewUser } from '../../middlewares/user.middleware';
import { verifyNewWork } from '../../middlewares/workExperience.middleware';

const router = Router();

// Users
router.get("/users", getAllUsers)
router.get("/users/getUserByEmail", getUserByEmail);
router.get("/users/:idUser/:extended?", verifyExtended, getUserById);

router.post("/users", verifyNewUser, createNewUser);
router.patch("/users", updateUser);
router.delete("/users", deleteUser);

// Work
router.get("/work/:userID", getWorkExperience);
router.post("/work", verifyNewWork, addWorkExperience);
router.delete("/work", deleteWorkExperience);
router.patch("/work", updateWorkExperience);

// Education
router.get("/education/:userID", getEducation)
router.delete("/education/", deleteEducation)
router.patch("/education", updateEducation)
router.post("/education", addEducation)

export default router;