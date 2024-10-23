const express = require('express');

const path = require('path');

// Para que seja possível utilizar o corpo de requisições
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Middleware para tratar body em formulários
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware para tratar requisições POST com corpo JSON
app.use(bodyParser.json());

// Rota GET com parâmetros na URL (localhost:3000/1/3)
router.get('/:n1/:n2', (req, res) => {
    // Recebe os params e transforma-os em números decimais
    const n1 = parseFloat(req.params.n1);
    const n2 = parseFloat(req.params.n2);

    // Verifica se algum dos dois números é 'NaN' após a conversão (ou seja, não era um número ao ser convertido)
    if (isNaN(n1) || isNaN(n2)) {
        // Envia uma mensagem de erro e retorna
        return res.send('<p>Ambos os parâmetros devem ser números!</p>');
    }

    // Envia o resultado
    res.send(`<p>A soma de ${n1} e ${n2} é igual a ${n1 + n2}</p>`);
});

// Rota GET com query parameters (localhost:3000/query?n1=1&n2=3)
router.get('/query', (req, res) => {
    // Recebe a query string e transforma-os em números decimais
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

    // Verifica se algum dos dois números é 'NaN' após a conversão (ou seja, não era um número ao ser convertido)
    if (isNaN(n1) || isNaN(n2)) {
        // Envia uma mensagem de erro e retorna
        return res.send('<p>Ambos os parâmetros devem ser números!</p>');
    }

    // Envia o resultado
    res.send(`<p>A soma de ${n1} e ${n2} é igual a ${n1 + n2}</p>`);
});

// Rota POST para somar com corpo da requisição JSON (utilizar PostMan para enviar uma requisição para localhost:3000)
// o Body da requisição deve conter: { "n1": 1, "n2": 3}
router.post('/', (req, res) => {
    // Recebe a requisição e transforma o json em números decimais
    const n1 = parseFloat(req.body.n1);
    const n2 = parseFloat(req.body.n2);

    // Verifica se algum dos dois números é 'NaN' após a conversão (ou seja, não era um número ao ser convertido)
    if (isNaN(n1) || isNaN(n2)) {
        // Retorna um BadRequest, caso alguma das chaves do JSON não tenha um número como valor
        return res.status(400).json({ error: 'Ambos os parâmetros devem ser números!' });
    }

    const result = n1 + n2;

    // Retorna um Success com o resultado, JSON esperado: { "result": 4}
    res.status(200).json({ result });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/somar.html'));
})
// Para recebimento via Formulário
app.post('/somar', (req, res) => {
    // Limpa os espaços em branco dos valores e converte para números decimais
    const n1 = parseFloat(req.body.n1.trim());
    const n2 = parseFloat(req.body.n2.trim());

    // Verifica se algum dos dois números é 'NaN' após a conversão (ou seja, não era um número ao ser convertido)
    if (isNaN(n1) || isNaN(n2)) {
        return res.send('Ambos os parâmetros devem ser números!');
    }

    // Retorna o resultado
    res.send(`<p>A soma de ${n1} e ${n2} é igual a ${n1 + n2}</p>`);
});

// Usar o router para todas as rotas na raiz '/'
app.use('/', router);

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
