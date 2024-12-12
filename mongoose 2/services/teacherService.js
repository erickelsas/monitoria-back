const { Teacher } = require('../models');
exports.getTeachers = async () => {
    try {
        const teachers = await Teacher.find({});
        return teachers;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getTeacherById = async (id) => {
    try {
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            throw new Error('Professor não encontrado.');
        }
        return teacher;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.createTeacher = async (teacherData) => {
    try {
        const newTeacher = await Teacher.create(teacherData);
        return newTeacher;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteTeacher = async (id) => {
    try {
        const result = await Teacher.findByIdAndDelete(id);
        if (!result) {
            throw new Error('Professor não encontrado.');
        }
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateTeacher = async (id, teacherData) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, teacherData, {
            new: true,
            runValidators: true
        });
        if (!updatedTeacher) {
            throw new Error('Professor não encontrado para atualização.');
        }
        return updatedTeacher;
    } catch (error) {
        throw new Error(error.message);
    }
};