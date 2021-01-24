import { Router } from 'express';
import { getCourses, getCourseById, createCourse, editCourse, deleteCourse } from '../../../controllers/course.controller';
//import controller methods

const router = Router();

router.get("/getCourses", getCourses);
router.get("/getCourse/:id", getCourseById);

router.post("/createCourse", createCourse);

router.patch("/editCourse/:id", editCourse);
router.patch("/delete/:id", deleteCourse);

export default router