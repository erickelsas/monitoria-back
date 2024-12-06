const express = require('express');
const router = express.Router();

const { courseController } = require('../controllers');

router.get('/course', courseController.getCourses);
router.get('/courses/:id', courseController.getCourseById);
router.post('/course', courseController.createCourse);
router.put('/course/:id', courseController.updateCourse);
router.delete('/course/:id', courseController.deleteCourse);

module.exports = router;