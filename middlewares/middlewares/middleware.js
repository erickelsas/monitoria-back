exports.log = (req, res, next) => {
    // Registra a hora da requisição
    const timestamp = new Date().toISOString();

    // Mostra no console a hora e a URL de acesso do usuário
    console.log(`[${timestamp}] Requisição: ${req.method} - ${req.url}`);
    next();
}

exports.validateNumber = (req, res, next) => {
    // Verifica se existe um Number na query
    if(!req.query.number){
        return res.send('<p>Deve haver uma query string chamada number</p>')
    }

    // Transforma o número em um Inteiro
    const number = parseInt(req.query.number);

    // Se não for número, retorna um erro
    if(isNaN(number)){
        return res.send(`<p>Erro: ${req.query.number} deve ser um número!</p>`)
    }

    // Coloca o inteiro no número
    req.query.number = number;

    // Passa para a próxima rota
    next();
}

exports.isAuthenticated = (req, res, next) => {
    // Verifica se existe uma sessão
    if (!(req.session && req.session.user)) {
        return res.redirect('/login');; // Usuário autenticado, prosseguir para a rota solicitada
    }

    // Usuário não autenticado, redirecionar para a página de login
    next();
}
