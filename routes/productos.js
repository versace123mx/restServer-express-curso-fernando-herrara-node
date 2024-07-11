import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import validarJWT from '../middlewares/validar-jwt.js'
import {esAdminRole} from '../middlewares/validar-roles.js'
import { ObtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } from '../controllers/productos.js'
import {productoCategoriaExistById,productoExistById} from '../helpers/db_productos_por_categoria.js'
import {categoriaExistById} from '../helpers/db-validators-categorias.js'

const routerProductos = Router()


//Obtener todas las categorias publico
routerProductos.get('/',ObtenerProductos)

//Obtener una categoria por id
routerProductos.get('/:id',[
    check('id').custom(productoCategoriaExistById),
    validarCampos
],obtenerProducto)

//Crear Producto - privado - cualquier persona con un token valido
routerProductos.post('/',[
    validarJWT,
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    check('categoria').custom(categoriaExistById),//verificamos que exista la categoria para insertar el producto asociado a la categoria
    check('descripcion','La descripcion es Obligatorio').not().isEmpty(),
    validarCampos
    ],
    crearProducto
)

//Actualizar - privado - cualquier persona con un token valido
routerProductos.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(productoExistById),
    check('categoria').custom(categoriaExistById),//verificamos que exista la categoria para insertar el producto asociado a la categoria
    esAdminRole,
    validarCampos
],actualizarProducto)

//Borrar - privado - admin
routerProductos.delete('/:id',[
    validarJWT,
    check('id').custom(productoExistById),
    esAdminRole,
    validarCampos
],borrarProducto)



export default routerProductos