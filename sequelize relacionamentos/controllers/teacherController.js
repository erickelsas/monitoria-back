const { teacherService } = require('../services');

exports.getTeachers = async (req, res) => {
    try{
        const teachers = await teacherService.getTeachers();

        if(!teachers || teachers.length === 0){
            return res.status(404).json({ message: 'Nenhum professor encontrado.' });
        }

        return res.status(200).json({
            message: 'Professores encontrados com sucesso.',
            data: teachers
        });
    } catch(error){
        return res.status(500).json({
            message: 'Erro ao buscar professores.',
            error: error.message
        });
    }
}

exports.getTeacherById = async (req, res) => {
    try{
        const id = req.params.id;

        if(id === null || id < 1 || isNaN(parseInt(id))){
            return res.status(400).json({ message: 'Id digitado inválido.' });
        }

        const teacher = await teacherService.getTeacherById(id);

        if(!teacher || teacher === null){
            return res.status(404).json({ message: 'Nenhum professor encontrado.' });
        }

        return res.status(200).json({
            message: 'Professor encontrado com sucesso.',
            data: teacher,
        });
    } catch(error) {
        return res.status(500).json({
            message: 'Erro ao buscar professor.',
            error: error.message
        })
    }
}

exports.createTeacher = async (req, res) => {
    try{
        const teacher = req.body;

        if(!teacher){
            return res.status(400).json({ message: 'Não existe professor enviado no body.' });
        }

        const teacherWithId = await teacherService.createTeacher(teacher);

        return res.status(201).json({
            message: 'Professor criado com sucesso.',
            data: teacherWithId
        })
    } catch(error){
        return res.status(500).json({
            message: 'Erro ao criar professor.',
            error: error.message
        })
    }
}

exports.updateTeacher = async (req, res) => {
    const id = req.params.id;
    const teacher = req.body;

    if (id === null || id < 1 || isNaN(parseInt(id))) {
        return res.status(400).json({ message: 'Id digitado inválido.' });
    }

    try{
        const updatedTeacher = await teacherService.updateTeacher(id, teacher);

        if(!updatedTeacher){
            return res.status(404).json({ message: 'Professor não encontrado.' });
        }

        return res.status(200).json({
            message: 'Professor atualiza com sucesso',
            data: updatedTeacher
        })
    } catch (error){
        return res.status(500).json({
            message: 'Erro ao atualizar professor',
            error: error.message
        })
    }
}

exports.deleteTeacher = async (req, res) => {
    try{
        const id = req.params.id;

        if (id === null || id < 1 || isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id digitado inválido.' });
        }

        const success = await teacherService.deleteTeacher(id);

        if(!success){
            return res.status(400).json({ message: 'Não foi possível deletar professor.' });
        }

        return res.status(200).json({
            message: 'Professor apagado com sucesso.'
        })
    } catch(error) {
        return res.status(500).json({
            message: 'Erro ao deletar professor.',
            error: error.message
        })
    }
}