module.exports = (sequelize, DataTypes) => {
    return sequelize.define('club', {
        name: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        floor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
}