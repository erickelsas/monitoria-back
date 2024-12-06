const { studentService } = require('../services');

exports.getStudents = async (req, res) => {
    try{
        const students = await studentService.getStudents();

        if(!students || students.length === 0){
            return res.status(404).json({ message: 'Nenhum estudante encontrado.' });
        }

        return res.status(200).json({
            message: 'Estudantes encontrados com sucesso.',
            data: students
        });
    } catch(error){
        return res.status(500).json({
            message: 'Erro ao buscar estudantes.',
            error: error.message
        });
    }
}

exports.getStudentById = async (req, res) => {
    try{
        const id = req.params.id;

        if(id === null || id < 1 || isNaN(parseInt(id))){
            return res.status(400).json({ message: 'Id digitado inválido.' });
        }

        const student = await studentService.getStudentById(id);

        if(!student || student === null){
            return res.status(404).json({ message: 'Nenhum estudante encontrado.' });
        }

        return res.status(200).json({
            message: 'Estudante encontrado com sucesso.',
            data: student,
        });
    } catch(error) {
        return res.status(500).json({
            message: 'Erro ao buscar estudante.',
            error: error.message
        })
    }
}

exports.createStudent = async (req, res) => {
    try{
        const student = req.body;

        if(!student){
            return res.status(400).json({ message: 'Não existe estudante enviado no body.' });
        }

        const studentWithId = await studentService.createStudent(student);

        return res.status(201).json({
            message: 'Estudante criado com sucesso.',
            data: studentWithId
        })
    } catch(error){
        return res.status(500).json({
            message: 'Erro ao criar estudante.',
            error: error.message
        })
    }
}

exports.updateStudent = async (req, res) => {
    const id = req.params.id;
    const student = req.body;

    if (id === null || id < 1 || isNaN(parseInt(id))) {
        return res.status(400).json({ message: 'Id digitado inválido.' });
    }

    try{
        const updatedStudent = await studentService.updateStudent(id, student);

        if(!updatedStudent){
            return res.status(404).json({ message: 'Estudante não encontrado.' });
        }

        return res.status(200).json({
            message: 'Estudante atualiza com sucesso',
            data: updatedStudent
        })
    } catch (error){
        return res.status(500).json({
            message: 'Erro ao atualizar estudante',
            error: error.message
        })
    }
}

exports.deleteStudent = async (req, res) => {
    try{
        const id = req.params.id;

        if (id === null || id < 1 || isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id digitado inválido.' });
        }

        const success = await studentService.deleteStudent(id);

        if(!success){
            return res.status(400).json({ message: 'Não foi possível deletar estudante.' });
        }

        return res.status(200).json({
            message: 'Estudante apagado com sucesso.'
        })
    } catch(error) {
        return res.status(500).json({
            message: 'Erro ao deletar estudante.',
            error: error.message
        })
    }
}