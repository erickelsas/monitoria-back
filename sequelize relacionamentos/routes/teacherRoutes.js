const express = require('express');
const router = express.Router();

const { teacherController } = require('../controllers');

router.get('/teacher', teacherController.getTeachers);
router.get('/teacher/:id', teacherController.getTeacherById);
router.post('/teacher', teacherController.createTeacher);
router.put('/teacher/:id', teacherController.updateTeacher);
router.delete('/teacher/:id', teacherController.deleteTeacher);

module.exports = router;