module.exports = (sequelize, DataTypes) => {
    return sequelize.define('attendance', {
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        period: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: { // 1이면 출석, 0이면 출석x
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        },
        reason: { // 출석x일 경우 사유
            type: DataTypes.STRING(128),
            allowNull: true
        }
    }, {
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
}