const { courseService } = require('../services');

exports.getCourses = async (req, res) => {
    try{
        const courses = await courseService.getCourses();

        if(!courses || courses.length === 0){
            return res.status(404).json({ message: 'Nenhum curso encontrado.' });
        }

        return res.status(200).json({
            message: 'Cursos encontrados com sucesso.',
            data: courses
        });
    } catch(error){
        return res.status(500).json({
            message: 'Erro ao buscar cursos.',
            error: error.message
        });
    }
}

exports.getCourseById = async (req, res) => {
    try{
        const id = req.params.id;

        if(id === null || id < 1 || isNaN(parseInt(id))){
            return res.status(400).json({ message: 'Id digitado inválido.' });
        }

        const course = await courseService.getCourseById(id);

        if(!course || course === null){
            return res.status(404).json({ message: 'Nenhum curso encontrado.' });
        }

        return res.status(200).json({
            message: 'Curso encontrado com sucesso.',
            data: course,
        });
    } catch(error) {
        return res.status(500).json({
            message: 'Erro ao buscar curso.',
            error: error.message
        })
    }
}

exports.createCourse = async (req, res) => {
    try{
        const course = req.body;

        if(!course){
            return res.status(400).json({ message: 'Não existe curso enviado no body.' });
        }

        const courseWithId = await courseService.createCourse(course);

        return res.status(201).json({
            message: 'Curso criado com sucesso.',
            data: courseWithId
        })
    } catch(error){
        return res.status(500).json({
            message: 'Erro ao criar curso.',
            error: error.message
        })
    }
}

exports.updateCourse = async (req, res) => {
    const id = req.params.id;
    const course = req.body;

    if (id === null || id < 1 || isNaN(parseInt(id))) {
        return res.status(400).json({ message: 'Id digitado inválido.' });
    }

    try{
        const updatedCourse = await courseService.updateCourse(id, course);

        if(!updatedCourse){
            return res.status(404).json({ message: 'Curso não encontrado.' });
        }

        return res.status(200).json({
            message: 'Curso atualiza com sucesso',
            data: updatedCourse
        })
    } catch (error){
        return res.status(500).json({
            message: 'Erro ao atualizar curso',
            error: error.message
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try{
        const id = req.params.id;

        if (id === null || id < 1 || isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id digitado inválido.' });
        }

        const success = await courseService.deleteCourse(id);

        if(!success){
            return res.status(400).json({ message: 'Não foi possível deletar curso.' });
        }

        return res.status(200).json({
            message: 'Curso apagado com sucesso.'
        })
    } catch(error) {
        return res.status(500).json({
            message: 'Erro ao deletar curso.',
            error: error.message
        })
    }
}