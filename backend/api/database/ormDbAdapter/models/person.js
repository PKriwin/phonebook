module.exports = function (sequelize, DataTypes) {

    return sequelize.define('person', {

        firstname : {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'site',
        freezeTableName: true
    })
}
