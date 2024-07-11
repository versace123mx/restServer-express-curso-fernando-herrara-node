import { Router } from 'express'
import { buscar } from '../controllers/buscar.js'

const routerSearch = Router()

routerSearch.get('/:coleccion/:termino',buscar)


export default routerSearch