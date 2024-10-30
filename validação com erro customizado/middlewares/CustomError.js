// Cria um Erro que herda a classe Error do javascript
class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

module.exports = CustomError;
