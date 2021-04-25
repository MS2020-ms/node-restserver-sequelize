import { Sequelize } from 'sequelize';

//nombre de la base de datos 'udemy-node', user, contrasena
const db = new Sequelize('udemy-node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false,
});

export default db;