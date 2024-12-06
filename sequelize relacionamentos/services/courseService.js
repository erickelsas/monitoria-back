const { Course } = require('../models');

exports.getCourses = async () => {
    try {
        const courses = await Course.findAll({
        });
        return courses;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getCourseById = async (id) => {
    try {
        const course = await Course.findOne({
            where: { id },
        });
        return course;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.createCourse = async (course) => {
    try {
        const newCourse = await Course.create(course);
        return newCourse;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteCourse = async (id) => {
    try {
        const deletedCount = await Course.destroy({ where: { id } });

        if (deletedCount === 0) {
            throw new Error('Curso não encontrado');
        }

        return deletedCount !== 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateCourse = async (id, course) => {
    try {
        const [rowsUpdated] = await Course.update(course, { where: { id } });

        if (rowsUpdated === 0) {
            throw new Error('Curso não encontrado para atualização.');
        }

        const updatedCourse = await Course.findOne({
            where: { id },
        });
        return updatedCourse;
    } catch (error) {
        throw new Error(error.message);
    }
};