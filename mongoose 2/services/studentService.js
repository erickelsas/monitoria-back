const { Student, Course } = require("../models");

exports.getStudents = async () => {
  try {
    const students = await Student.find().populate("course"); // Use populate para buscar os cursos relacionados
    return students;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getStudentById = async (id) => {
  try {
    const student = await Student.findById(id).populate("course");
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createStudent = async (student) => {
  try {
    if (student.hasOwnProperty("course")) {
      const course = await Course.findOne({ name: student.course });

      // Associe o ID do curso ao aluno
      student.course = course;
    }

    const newStudent = new Student(student); // Cria um novo aluno com o modelo do Mongoose
    await newStudent.save();

    // Retorne o aluno recém-criado com a população do curso
    return await Student.findById(newStudent._id).populate("course");
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteStudent = async (id) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(id); // Deleta o aluno pelo ID

    if (!deletedStudent) {
      throw new Error("Estudante não encontrado");
    }

    return true; // Retorna true se a exclusão foi bem-sucedida
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateStudent = async (id, student) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, student, { new: true }).populate("course");

    if (!updatedStudent) {
      throw new Error("Estudante não encontrado para atualização.");
    }

    return updatedStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};