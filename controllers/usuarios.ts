import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    //res.json(usuarios);
    res.json({ usuarios });

    // res.json({
    //     msg: 'getUsuarios'
    // });
}

export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id: ${id}`
        })
    }

    // res.json({
    //     msg: 'getUsuario',
    //     id
    // })
}

export const postUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        //con Sequelize escribo como en Queries
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            //return para que no continue ejecutando el programa
            return res.status(400).json({
                msg: `Ya existe un usuario con el email: ` + body.email
            })
        }

        const usuario = Usuario.build(body);
        await usuario.save();

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

export const putUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            //return para que no continue ejecutando el programa
            return res.status(404).json({
                msg: `No existe un usuario con el id: ` + id
            })
        }

        await usuario.update(body);

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

    // res.json({
    //     msg: 'putUsuario',
    //     body,
    //     id
    // })
}

export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        //return para que no continue ejecutando el programa
        return res.status(404).json({
            msg: `No existe un usuario con el id: ` + id
        })
    }

    //Eliminacion Fisica:
    //await usuario.destroy();
    //res.json(usuario);

    //Eliminacion Logica:
    //false = 0, por tratarlo como un tinyint
    await usuario.update({ estado: false });
    res.json(usuario);

    // res.json({
    //     msg: 'deleteUsuario',
    //     id
    // })
}