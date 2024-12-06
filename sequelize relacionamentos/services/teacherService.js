const { Teacher, CourseTeacher } = require('../models');

exports.getTeachers = async () => {
    try {
        const teachers = await Teacher.findAll({
        });
        return teachers;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getTeacherById = async (id) => {
    try {
        const teacher = await Teacher.findOne({
            where: { id },
        });
        return teacher;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.createTeacher = async (teacher) => {
    try {
        const newTeacher = await Teacher.create(teacher);
        return newTeacher;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteTeacher = async (id) => {
    try {
        const deletedCount = await Teacher.destroy({ where: { id } });

        if (deletedCount === 0) {
            throw new Error('Professor não encontrado');
        }

        return deletedCount !== 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateTeacher = async (id, teacher) => {
    try {
        const [rowsUpdated] = await Teacher.update(teacher, { where: { id } });

        if (rowsUpdated === 0) {
            throw new Error('Professor não encontrado para atualização.');
        }

        const updatedTeacher = await Teacher.findOne({
            where: { id },
        });
        return updatedTeacher;
    } catch (error) {
        throw new Error(error.message);
    }
};