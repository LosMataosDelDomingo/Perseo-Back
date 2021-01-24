import { Router } from 'express';
import { getCourses, getCourseById, createCourse, editCourse, deleteCourse } from '../../../controllers/course.controller';
import { verifyIfAdmin } from '../../../middlewares/auth.middleware';
//import controller methods

const router = Router();

router.get("/getCourses", getCourses);
router.get("/getCourse/:id", getCourseById);

router.post("/createCourse", verifyIfAdmin, createCourse);

router.patch("/editCourse/:id", verifyIfAdmin, editCourse);
router.patch("/delete/:id", verifyIfAdmin, deleteCourse);

export default router