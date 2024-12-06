module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('course', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        numberOfSemesters: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 8
        }
    });

    return Course;
}