const { Course } = require('../models');

exports.getCourses = async () => {
    try {
        const courses = await Course.find({});
        return courses;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getCourseById = async (id) => {
    try {
        const course = await Course.findById(id);
        if (!course) {
            throw new Error('Curso não encontrado.');
        }
        return course;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.createCourse = async (courseData) => {
    try {
        const newCourse = await Course.create(courseData);
        return newCourse;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteCourse = async (id) => {
    try {
        const result = await Course.findByIdAndDelete(id);
        if (!result) {
            throw new Error('Curso não encontrado.');
        }
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateCourse = async (id, courseData) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, courseData, {
            new: true, // Retorna o documento atualizado
            runValidators: true, // Garante validação ao atualizar
        });
        if (!updatedCourse) {
            throw new Error('Curso não encontrado para atualização.');
        }
        return updatedCourse;
    } catch (error) {
        throw new Error(error.message);
    }
};