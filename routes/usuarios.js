import { Router } from 'express'
import { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } from '../controllers/usuarios.js'

const router = Router();

//aqui en los endpoint de cada verbo http le pasamos la funcion que esta en el controlador y ahi es donde estar la logica

router.get('/',usuariosGet)
router.post('/',usuariosPost)
router.put('/:id/:id2',usuariosPut)
router.patch('/',usuariosPatch)
router.delete('/',usuariosDelete)

export default router