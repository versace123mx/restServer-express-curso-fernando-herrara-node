import Role from '../models/rol.js'
import Usuario from '../models/usuario.js'
import mongoose from "mongoose";

const esRolvalido = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`No existe el rol ${rol}`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error(`El email ${correo} ya existe`)
    }
}

const userExistById = async (id) => {
    if(mongoose.Types.ObjectId.isValid(id)){
        const existId = await Usuario.findById(id)
        if(!existId){
            throw new Error(`El id ${id} no existe`)
        }
    }else{
        throw new Error(`El id ${id} no es valido`)
    }
}

export{
    esRolvalido,
    emailExiste,
    userExistById
}