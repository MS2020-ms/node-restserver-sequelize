import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
//Equivale a //import router from '../routes/usuario';
//Equivale a //import * as userRoutes from '../routes/usuario'; //Alias
import cors from 'cors';

import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        //si port es undefined, asigno valor '8000'
        this.port = process.env.PORT || '8000';

        //Metodos iniciales:

        this.dbConnection();
        //Middlewares
        this.middlewares();
        //Definir mis rutas
        this.routes();
    }

    //Conectar BBDD
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');

        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura del body (parsear el body)
        this.app.use(express.json());

        //Carpeta publica
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        })
    }

}

export default Server;