const { Sequelize, DataTypes } = require("sequelize");
const initModels = require('../mvc/models/init-models')
// Database connection details.
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    operatorsAliases: 0,
    host: process.env.HOST,
    dialect: process.env.dialect,
    port: 3306,
    operatorsAliases: false,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

// Connecting to the database.
try {
    sequelize
        .authenticate()
        .then(() => {
            console.log("Connected...");
        })
        .catch((err) => {
            console.log("Error ", err);
        });
} catch (error) {
    console.log("Error ", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Sequelizing postgres database into ORM.
db.models = initModels(sequelize);

// Syncing the database with sequelize.
db.sequelize
    .sync({ force: false, alter: { drop: false } })
    .then(() => {
        console.log("Re-sync done!");
    })
    .catch((err) => {
        console.log("Error ", err);
    });

module.exports = db;