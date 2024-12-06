module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('teacher', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
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
                    msg: 'O e-mail deve ter um formato válido.'
                }
            } 
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isNumeric: {
                    msg: 'O número de telefone deve conter apenas dígitos.'
                },
                len: {
                    args: [10, 15],
                    msg: 'O número de telefone deve ter entre 10 e 15 dígitos.'
                }
            }
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: {
                    args: [['Bacharel', 'Mestre', 'Doutor', 'Pós-doutor']],
                    msg: 'O grau acadêmico deve ser um dos seguintes: Bacharel, Mestre, Doutor ou Pós-doutor.'
                }
            },
            defaultValue: 'Bacharel'
        }
    });

    return Teacher;
};