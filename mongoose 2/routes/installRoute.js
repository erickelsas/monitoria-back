const express = require('express');
const router = express.Router();

const { Course, Student, Teacher, CourseTeacher } = require('../models');

router.get('/install/', async (req, res) => {
  const courses = [
    { name: "Engenharia de Software", description: "Curso focado no desenvolvimento de software, qualidade e processos ágeis.", numberOfSemesters: 8 },
    { name: "Ciência da Computação", description: "Curso que aborda fundamentos de computação, algoritmos e inteligência artificial.", numberOfSemesters: 8 },
    { name: "Sistemas de Informação", description: "Curso voltado para gestão de sistemas, banco de dados e análise de negócios.", numberOfSemesters: 8 },
    { name: "Redes de Computadores", description: "Curso especializado em infraestrutura, segurança e redes de computadores.", numberOfSemesters: 6 },
    { name: "Análise e Desenvolvimento de Sistemas", description: "Curso técnico com foco em desenvolvimento de aplicações e arquitetura de sistemas.", numberOfSemesters: 5 }
  ];

  const students = [
    { name: "João Bobo", email: "joaobobo@gmail.com", phone: "11987654321", course: "Engenharia de Software" },
    { name: "Ana Costa", email: "anacosta@gmail.com", phone: "11991234567", course: "Ciência da Computação" },
    { name: "Carlos Lima", email: "carloslima@gmail.com", phone: "11999876543", course: "Sistemas de Informação" },
    { name: "Fernanda Souza", email: "fernandasouza@gmail.com", phone: "11993456789", course: "Redes de Computadores" },
    { name: "Pedro Santos", email: "pedrosantos@gmail.com", phone: "11995678912", course: "Análise e Desenvolvimento de Sistemas" }
  ];

  const teachers = [
    { name: "João Professor", email: "professor1@gmail.com", phone: "14991288878" },
    { name: "Ana Docente", email: "anadocente@gmail.com", phone: "11987654321", degree: "Doutor" },
    { name: "Carlos Mestre", email: "carlosmestre@gmail.com", phone: "21999876543", degree: "Mestre" },
    { name: "Fernanda Educadora", email: "fernandaeducadora@gmail.com", phone: "31993456789", degree: "Pós-doutor" },
    { name: "Pedro Instrutor", email: "pedroinstrutor@gmail.com", phone: "41995678912" }
  ];

  const courseTeachers = [
    { courseId: 1, teacherId: 1 },
    { courseId: 2, teacherId: 2 },
    { courseId: 3, teacherId: 3 },
    { courseId: 4, teacherId: 4 },
    { courseId: 5, teacherId: 5 }
  ];

  try {
    // Limpeza do banco de dados (opcional, pode ser removido em produção)
    await Course.deleteMany({});
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await CourseTeacher.deleteMany({});

    // Criação dos cursos
    const createdCourses = await Course.insertMany(courses);

    // Atualiza a lista de students para associar o ID do curso ao aluno
    for (let student of students) {
      // Encontra o curso pelo nome e atribui o _id
      const course = createdCourses.find(c => c.name === student.course);
      student.course = course._id; // Associando o ID do curso ao aluno
    }

    // Criação dos alunos
    const createdStudents = await Student.insertMany(students);

    // Criação dos professores
    const createdTeachers = await Teacher.insertMany(teachers);

    // Criação das associações entre cursos e professores
    const courseTeacherAssociations = courseTeachers.map(association => ({
      // Associando os _id dos cursos e professores
      courseId: createdCourses[association.courseId - 1]._id,
      teacherId: createdTeachers[association.teacherId - 1]._id
    }));

    // Criação das associações de cursos e professores
    await CourseTeacher.insertMany(courseTeacherAssociations);

    console.log("Banco de dados e registros criados com sucesso!");
    return res.status(201).json({ message: 'Instalado com sucesso.' });
  } catch (error) {
    console.error('Erro ao instalar banco de dados: ', error);
    return res.status(500).json({ message: "Erro ao instalar o banco de dados.", error: error.message });
  }
});

module.exports = router;