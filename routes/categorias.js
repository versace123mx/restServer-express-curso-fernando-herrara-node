import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import validarJWT from '../middlewares/validar-jwt.js'
import {esAdminRole} from '../middlewares/validar-roles.js'
import { ObtenerCategorias, obtenerCategoria, crearCategoria, actualizarCategoria, borrarCategoria } from '../controllers/categorias.js'
import {categoriaExistById} from '../helpers/db-validators-categorias.js'

const routerCategorias = Router()

//validar que el id sea valido en un middleware personalizado
//middleware custom para validar si existe la categoria


//Obtener todas las categorias publico
routerCategorias.get('/',ObtenerCategorias)

//Obtener una categoria por id
routerCategorias.get('/:id',[
    check('id').custom(categoriaExistById),
    validarCampos
],obtenerCategoria)

//Crear Categorias - privado - cualquier persona con un token valido
routerCategorias.post('/',[
    validarJWT,
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    validarCampos
    ],
    crearCategoria
)

//Actualizar - privado - cualquier persona con un token valido
routerCategorias.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(categoriaExistById),
    validarCampos
],actualizarCategoria)

//Borrar - privado - admin
routerCategorias.delete('/:id',[
    validarJWT,
    check('id').custom(categoriaExistById),
    esAdminRole,
    validarCampos
],borrarCategoria)
export default routerCategorias