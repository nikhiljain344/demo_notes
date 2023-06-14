const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        mobile: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        role: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: "user"
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        otp: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        tablefilter: 'users',
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