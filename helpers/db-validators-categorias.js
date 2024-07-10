import Categoria from '../models/categoria.js'
import mongoose from "mongoose";

const categoriaExistById = async (id) => {
    if(mongoose.Types.ObjectId.isValid(id)){
        const existId = await Categoria.findById(id)
        if(!existId){
            throw new Error(`El id ${id} no existe`)
        }
    }else{
        throw new Error(`El id ${id} no es valido`)
    }
}

export{
    categoriaExistById
}