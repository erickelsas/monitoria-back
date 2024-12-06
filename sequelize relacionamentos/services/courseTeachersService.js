const { CourseTeacher, Teacher, Course } = require('../models');

exports.getAllCourseTeachers = async () => {
    try {
        const courseTeachers = await CourseTeacher.findAll({
            include: [
                {
                    model: Teacher,
                    as: 'Teachers',
                },
                {
                    model: Course,
                    as: 'Courses',
                },
            ],
        });
        return courseTeachers;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getCourseTeacherById = async (id) => {
    try {
        const courseTeacher = await CourseTeacher.findOne({
            where: { id },
            include: [
                {
                    model: Teacher,
                    as: 'Teachers',
                },
                {
                    model: Course,
                    as: 'Courses',
                },
            ],
        });

        if (!courseTeacher) {
            throw new Error('Associação entre professor e curso não encontrada.');
        }

        return courseTeacher;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getTeachersByCourseId = async (courseId) => {
    try {
      const teachers = await Teacher.findAll({
        include: {
          model: Course,
          as: 'Courses', // O alias definido na associação muitos-para-muitos
          where: { id: courseId },
          through: { attributes: [] }, // Exclui a tabela intermediária na resposta
        },
      });
      return teachers;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  exports.getCoursesByTeacherId = async (teacherId) => {
    try {
      const courses = await Course.findAll({
        include: {
          model: Teacher,
          as: 'Teachers', // O alias definido na associação muitos-para-muitos
          where: { id: teacherId },
          through: { attributes: [] }, // Exclui a tabela intermediária na resposta
        },
      });
      return courses;
    } catch (error) {
      throw new Error(error.message);
    }
  };  

exports.addTeachersToCourse = async (courseId, teacherIds) => {
    try {
        const associations = teacherIds.map((teacherId) => ({
            courseId,
            teacherId,
        }));

        const createdAssociations = await CourseTeacher.bulkCreate(associations);
        return createdAssociations;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.removeTeacherFromCourse = async (courseId, teacherId) => {
    try {
        const deletedCount = await CourseTeacher.destroy({
            where: { courseId, teacherId },
        });

        if (deletedCount === 0) {
            throw new Error('Associação entre professor e curso não encontrada.');
        }

        return deletedCount !== 0;
    } catch (error) {
        throw new Error(error.message);
    }
};