import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import {validarArchivoSubir} from '../middlewares/validar-archivo.js'
import { cargarArchivo, actualizarImagen, mostrarImagen,actualizarImagenCloudinary } from '../controllers/uploads.js'
import {coleccionesPermitidas} from '../helpers/db-validators.js'

const routerUploadCloudinary = Router()

routerUploadCloudinary.post('/',validarArchivoSubir,cargarArchivo)

routerUploadCloudinary.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),//c es la coleccion que se esta pasando en la url
    validarCampos
],actualizarImagenCloudinary)

routerUploadCloudinary.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),//c es la coleccion que se esta pasando en la url
    validarCampos
],mostrarImagen)

export default routerUploadCloudinary