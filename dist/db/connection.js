"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//nombre de la base de datos 'udemy-node', user, contrasena
const db = new sequelize_1.Sequelize('udemy-node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false,
});
exports.default = db;
//# sourceMappingURL=connection.js.map