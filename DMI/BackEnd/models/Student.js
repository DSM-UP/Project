module.exports = (sequelize, DataTypes) => {
    return sequelize.define('student', {
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        class: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
}