import { Router } from 'express'
import { check } from 'express-validator'
import { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } from '../controllers/usuarios.js'

import { esRolvalido,emailExiste,userExistById } from '../helpers/db-validators.js'

import { validarCampos } from '../middlewares/validar-campos.js'
import validarJWT from '../middlewares/validar-jwt.js'
import { esAdminRole, tieneRole }  from '../middlewares/validar-roles.js'

const router = Router();

//aqui en los endpoint de cada verbo http le pasamos la funcion que esta en el controlador y ahi es donde debe estar la logica

router.get('/',usuariosGet)

//los middleware deben de ir en medio y si hay un que tenga que hacer nex como validarCampos, si se cumple pasa al siguiente controlador que seria usuariosPost
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail().custom(emailExiste),//validacion de tipo email y una validacion optimizada
    check('password','El password debe de tener minimo 8 caracteres').isLength({min:8}),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolvalido),//Esta es una funcion esRolvalido que recive un parametro pero no se le pasa por que es el mismo valor que se va evaluar
    validarCampos
],usuariosPost)//los middleware van en la segunda posicion si se mandan varios entonces se manda un  arreglo router.post('/',middleware,usuariosPost) o router.post('/',[middlewares],usuariosPost)


router.put('/:id',[
    check('id').custom(userExistById),//validacion que el id tenga las caracteristicas de mongo y que exista en la db
    check('rol').custom(esRolvalido),//Esta es una funcion esRolvalido
    validarCampos
],usuariosPut)



router.patch('/',usuariosPatch)

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id').custom(userExistById),//validacion que el id tenga las caracteristicas de mongo y que exista en la db
    validarCampos
],usuariosDelete)

export default router