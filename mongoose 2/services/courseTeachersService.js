const { CourseTeacher, Teacher, Course } = require("../models");

exports.getAllCourseTeachers = async () => {
  try {
    const courseTeachers = await CourseTeacher.find().populate("teacherId").populate("courseId");
    return courseTeachers;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getCourseTeacherById = async (id) => {
    try {
      const courseTeacher = await CourseTeacher.findById(id).populate("teacherId").populate("courseId");
  
      if (!courseTeacher) {
        throw new Error("Associação entre professor e curso não encontrada.");
      }
  
      return courseTeacher;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

exports.getTeachersByCourseId = async (courseId) => {
    try {
      const courseTeachers = await CourseTeacher.find({ courseId }).populate("teacherId");
      return courseTeachers.map(courseTeacher => courseTeacher.teacherId);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  exports.getCoursesByTeacherId = async (teacherId) => {
    try {
      const courseTeachers = await CourseTeacher.find({ teacherId }).populate("courseId");
      return courseTeachers.map(courseTeacher => courseTeacher.courseId);
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
  
      const createdAssociations = await CourseTeacher.insertMany(associations);
      return createdAssociations;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

exports.removeTeacherFromCourse = async (courseId, teacherId) => {
    try {
      const deletedCount = await CourseTeacher.deleteOne({
        courseId,
        teacherId,
      });
  
      if (deletedCount.deletedCount === 0) {
        throw new Error("Associação entre professor e curso não encontrada.");
      }
  
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };