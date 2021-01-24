import { Request, Response } from "express";
import { COURSE_CREATED, COURSE_EDITED, COURSE_DELETED } from '../constants/logs';
import { db_createCourse, db_editCourse, db_getAllCourses, db_getCourseById, db_deleteCourse } from '../repositories/course.repository';

// GET: Return the course list
export const getCourses = async (req: Request, res: Response): Promise<Response> => {
    try {
        const coursesList = await db_getAllCourses();
        return res.status(200).json({ result: coursesList });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

// GET: Return course by id
export const getCourseById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const courseById = await db_getCourseById(req.params.id);
        return res.status(200).json({ result: courseById });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

// POST: Create a new course
export const createCourse = async (req: Request, res: Response): Promise<Response> => {
    try {
        await db_createCourse(req.body.newCourse);
        return res.status(201).json({ msg: COURSE_CREATED });
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}

//PATCH: Edit existing course 
export const editCourse = async (req: Request, res: Response): Promise<Response> => {
    try {
        await db_editCourse(req.params.id, req.body.actualCourse);
        return res.status(201).json({msg: COURSE_EDITED});
    } catch (e) {
        return res.status(400).json({msg: e.message});
    }
}

//PATCH: Soft deleting course
export const deleteCourse = async(req: Request, res: Response): Promise<Response> => {
    try{
        await db_deleteCourse(req.params.id);
        return res.status(201).json({msg: COURSE_DELETED});
    } catch (e) {
        return res.status(400).json({msg: e.message});
    }
}