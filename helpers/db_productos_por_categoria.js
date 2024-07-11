import Producto from '../models/producto.js'
import mongoose from "mongoose";

const productoCategoriaExistById = async (id) => {
    if(mongoose.Types.ObjectId.isValid(id)){
        const existId = await Producto.findOne({categoria:id})
        if(!existId){
            throw new Error(`El id ${id} no existe`)
        }
    }else{
        throw new Error(`El id ${id} no es valido`)
    }
}

const productoExistById = async (id) => {
    if(mongoose.Types.ObjectId.isValid(id)){
        const existId = await Producto.findById(id)
        if(!existId){
            throw new Error(`El id ${id} no existe`)
        }
    }else{
        throw new Error(`El id ${id} no es valido`)
    }
}

export{
    productoCategoriaExistById,
    productoExistById
}