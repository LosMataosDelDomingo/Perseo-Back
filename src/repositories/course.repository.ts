import Course, { ICourse } from '../models/course.model';

//Get all courses
export const db_getAllCourses = async (): Promise<[ICourse]> => {
    
    const filter = {is_active: true};
    const coursesList = await Course.find(filter);
    return coursesList;

}

//Get course by id
export const db_getCourseById = async (courseId: string): Promise<[ICourse]> => {
    
    const filter = { _id: courseId, is_active: true };
    const courseData = await Course.find(filter);
    return courseData;

}

//Create course
export const db_createCourse = async (newCourse: ICourse) => {

    const addedCourse = new Course(newCourse);
    await addedCourse.save();
    return addedCourse;

}

//Update course information
export const db_editCourse = async (courseId:string, actualCourse: ICourse) => {

    const filter = {_id: courseId};
    const options = {new: true};
    const editedCourse = await Course.findByIdAndUpdate(filter, actualCourse, options);
    return editedCourse;
    
}

//Delete course

export const db_deleteCourse = async (courseId: string) => {
    
    const filter = {_id: courseId};
    const deleteOption = {is_active: false};
    const options = {new: true};
    const deletedCourse = await Course.findByIdAndUpdate(filter, deleteOption, options);

    return deletedCourse.n;

}

