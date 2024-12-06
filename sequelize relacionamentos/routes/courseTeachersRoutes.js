const express = require('express');
const router = express.Router();

const { courseTeachersController } = require('../controllers');

router.get('/course/teachers', courseTeachersController.getAllCourseTeachers);
router.get('/course/teachers/:id', courseTeachersController.getCourseTeacherById);
router.get('/course/:courseId/teachers', courseTeachersController.getTeachersByCourse);
router.get('/teacher/:teacherId/courses', courseTeachersController.getCoursesByTeacher);
router.post('/course/:courseId/teachers', courseTeachersController.addTeachersToCourse);
router.delete('/course/:courseId/teachers/:teacherId', courseTeachersController.removeTeacherFromCourse);

module.exports = router;