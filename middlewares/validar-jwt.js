import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js'

const validarJWT = async (req,res,next) =>{
    
    const token = req.header('x-token')//con header() solo obtenemos el valor que queremos con headers obtenemos toda la cabecera
    if(!token){
        return res.status(401).json({msg: 'No hay token en la peticion'})
    }

    try {
        const { uid } = jwt.verify(token,process.env.JWT_SECRET)

        //leer el usuaruio que corresponde al uid
        const usuario = await Usuario.findById(uid)

        //si el usuario no existe
        if(!usuario){
            return res.status(401).json({msg: 'Token no valido - usuario no existe en DB'})
        }

        //verificar si el uid tiene estado en tru
        if(!usuario.estado){
            return res.status(401).json({msg: 'Token no valido - usuario deshabilit'})
        }
        req.usuario = usuario
        next()
    } catch (error) {
        res.status(401).json({msg: 'Token no valido'})
    }

}

export default validarJWT