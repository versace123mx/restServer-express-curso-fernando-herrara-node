import fs from 'fs'
import { subirArchivo } from '../helpers/subir-archivo.js'
import Usuario from '../models/usuario.js'
import Producto from '../models/producto.js'
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'

dotenv.config();
cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret,
});

const cargarArchivo = async (req, res) => {

    try {
        const nombre = await subirArchivo(req.files, undefined, 'pecoras')
        res.json({ nombre })
    } catch (error) {
        res.status(400).json(error)
    }
}

const actualizarImagen = async (req, res) => {
    const { coleccion, id } = req.params

    let modelo
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id ${id}` })
            }
            break;
        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' })
    }

    //verificamos si tiene el campo imagen, si tiene el campo imagen es por que ya hay una imagen previa
    if( modelo.imagen ){
        const pathImage = './uploads/'+coleccion+'/'+modelo.imagen //creamos la ruta de la imagen previa
        //verificamos si existe la imagen
        if(fs.existsSync(pathImage)){
            fs.unlinkSync(pathImage)//en caso de que la imagen previa exista procedemos a eliminarla
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion)
    modelo.imagen = nombre
    await modelo.save({ new: true })
    res.json({ modelo })

}

//Subir imagen con Cloudinary
const actualizarImagenCloudinary = async (req, res) => {

    const { coleccion, id } = req.params

    let modelo
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id ${id}` })
            }
            break;
        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' })
    }

    //verificamos si tiene el campo imagen, si tiene el campo imagen es por que ya hay una imagen previa
    if( modelo.imagen ){
       
    }

    const {tempFilePath} = req.files.archivo
    try {
        const resp = await cloudinary.uploader.upload(tempFilePath)
        res.json({ resp })
    } catch (error) {
        res.status(400).json(error)
    }

    //const nombre = await subirArchivo(req.files, undefined, coleccion)
    //modelo.imagen = nombre
    //await modelo.save({ new: true })
    

}

const mostrarImagen = async (req, res) =>{
    const { coleccion, id } = req.params

    let modelo
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id ${id}` })
            }
            break;
        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' })
    }

    //verificamos si tiene el campo imagen, si tiene el campo imagen es por que ya hay una imagen previa
    if( modelo.imagen ){
        const pathImage = `${process.cwd()}/uploads/${coleccion}/${modelo.imagen}` //creamos la ruta de la imagen previa
        //verificamos si existe la imagen
        if(fs.existsSync(pathImage)){
            return res.sendFile(pathImage)
        }
    }
    const pathImage = `${process.cwd()}/assets/no-image.jpg`
    return res.sendFile(pathImage)
}

export {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}