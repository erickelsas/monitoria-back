const { courseTeachersService } = require('../services');

// Controlador para obter todas as associações
exports.getAllCourseTeachers = async (req, res) => {
    try {
        const courseTeachers = await courseTeachersService.getAllCourseTeachers();
        return res.status(200).json(courseTeachers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para obter uma associação específica por ID
exports.getCourseTeacherById = async (req, res) => {
    const { id } = req.params;

    try {
        const courseTeacher = await courseTeachersService.getCourseTeacherById(id);
        return res.status(200).json(courseTeacher);
    } catch (error) {
        if (error.message === 'Associação entre professor e curso não encontrada.') {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
};

exports.getTeachersByCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const teachers = await courseTeachersService.getTeachersByCourseId(courseId);
        return res.status(200).json(teachers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.getCoursesByTeacher = async (req, res) => {
    const { teacherId } = req.params;

    try {
        const courses = await courseTeachersService.getCoursesByTeacherId(teacherId);
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.addTeachersToCourse = async (req, res) => {
    const { courseId } = req.params; // ID do curso
    const { teacherIds } = req.body; // Lista de IDs de professores

    if (!Array.isArray(teacherIds) || teacherIds.length === 0) {
        return res.status(400).json({ message: 'É necessário fornecer uma lista de IDs de professores.' });
    }

    try {
        const associations = await courseTeachersService.addTeachersToCourse(courseId, teacherIds);
        return res.status(201).json(associations);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.removeTeacherFromCourse = async (req, res) => {
    const { courseId, teacherId } = req.params;

    try {
        await courseTeachersService.removeTeacherFromCourse(courseId, teacherId);
        return res.status(200).json({ message: 'Professor removido do curso com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};