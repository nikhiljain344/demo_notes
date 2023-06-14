const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('notes', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        tablefilter: 'notes',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
        ],
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: "deleted_at"
    });
};