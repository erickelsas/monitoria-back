module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('book', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }, 
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        publishedYear: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^\d{4}$/
            }
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Book;
}