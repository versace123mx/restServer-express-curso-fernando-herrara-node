import mongoose from "mongoose";
import Usuario from "../models/usuario.js"
import Categoria from "../models/categoria.js"
import Producto from "../models/producto.js"


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles',
]


const buscarUsuarios = async (termino='',res)=>{
    const esMongoID = mongoose.Types.ObjectId.isValid(termino)

    //buscar por id
    if(esMongoID){
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario]:['']
        })
    }

    //Se buca por nombre o correo
    const regex = new RegExp(termino,'i')
    const usuarios = await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    })
    res.json({
            results: usuarios
        })
}

const buscarCategorias = async (termino='',res)=>{
    const esMongoID = mongoose.Types.ObjectId.isValid(termino)

    //buscar por id
    if(esMongoID){
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria) ? [categoria]:['']
        })
    }

    //Se buca por nombre
    const regex = new RegExp(termino,'i')
    const categorias = await Categoria.find({nombre:regex, estado:true})
    res.json({
            results: categorias
        })
}

const buscarProductos = async (termino='',res)=>{
    const esMongoID = mongoose.Types.ObjectId.isValid(termino)

    //buscar por id
    if(esMongoID){
        const producto = await Producto.findById(termino).populate('categoria','nombre')
        return res.json({
            results: (producto) ? [producto]:['']
        })
    }

    //Se buca por nombre o correo
    const regex = new RegExp(termino,'i')
    const productos = await Producto.find({nombre:regex,estado:true}).populate('categoria','nombre')
    res.json({
            results: productos
        })
}

const buscar = (req, res) =>{
    const {coleccion,termino} = req.params; //extraemos los parametros que bienen de la url
    if(!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({msg:`Las colecciones permitidas son ${coleccionesPermitidas}`})
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino,res)
        break;
        case 'categorias':
            buscarCategorias(termino,res)
        break;
        case 'productos':
            buscarProductos(termino,res)
        break;
        default:
            res.status(500).json({msg:'se me olvido hacer esta busqueda'})
        break;

    }
    //resp.json({msg:'buscar'})
}

export {
    buscar
}