const { Student, Course } = require("../models");

exports.getStudents = async () => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: Course,
          as: "Course",
        },
      ],
    });
    return students;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getStudentById = async (id) => {
  try {
    const student = await Student.findOne({
      where: { id },
      include: [
        {
          model: Course,
          as: "Course",
        },
      ],
    });
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createStudent = async (student) => {
  try {
    if(student.hasOwnProperty('course')){
      const course = await Course.findOne({ where: { name: student.course }});
      
      student.courseId = course.id;
    }

    const newStudent = await Student.create(student);
    return await Student.findOne({
      where: { id: newStudent.id },
      include: [
        {
          model: Course,
          as: "Course",
        },
      ],
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteStudent = async (id) => {
  try {
    const deletedCount = await Student.destroy({ where: { id } });

    if (deletedCount === 0) {
      throw new Error("Estudante não encontrado");
    }

    return deletedCount !== 0;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateStudent = async (id, student) => {
  try {
    const [rowsUpdated] = await Student.update(student, { where: { id } });

    if (rowsUpdated === 0) {
      throw new Error("Estudante não encontrado para atualização.");
    }

    const updatedStudent = await Student.findOne({
      where: { id },
      include: [
        {
          model: Course,
          as: "Course",
        },
      ],
    });
    return updatedStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};
