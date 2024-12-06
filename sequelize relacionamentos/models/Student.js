module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('student', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'O e-mail deve ter um formato válido.', // Associado à validação isEmail
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isNumeric: {
                    msg: 'O número de telefone deve conter apenas dígitos.', // Associado à validação isNumeric
                },
                len: {
                    args: [10, 15], // Intervalo de comprimento permitido
                    msg: 'O número de telefone deve ter entre 10 e 15 dígitos.', // Associado à validação len
                },
            },
        },
    });

    return Student;
};
