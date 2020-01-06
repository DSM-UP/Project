module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        username: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false
        }
    }, {
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
};