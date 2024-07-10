import bcrypt from 'bcryptjs'
import Usuario from '../models/usuario.js'
import generarJWT   from '../helpers/generarJWT.js'
import {googleVerify} from '../helpers/google.verify.js'

//Controlador de autentication

const login = async (req, res) => {
    const { correo, password } = req.body
    try {
        //verificar si el correo existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario){
            return res.status(400).json({ msg: 'El usuario o password son incorrectos.'})
        }

        //verificar si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({ msg: 'El usuario no existe estado false.'})
        }

        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if (!validPassword){
            return res.status(400).json({ msg: 'El usuario o password son incorrectos. - password'})
        }

        //Generar JWT
        const token = generarJWT(usuario.id)
        console.log(token)



        //const user = await User.findOne({ correo })
        res.json({ message: usuario })
    }catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error' })
    }
}

const googleSignIn = async(req,res)=>{
    const { id_token } = req.body
    try {
        const {nombre, img, correo} = await googleVerify(id_token)

        let usuario = await Usuario.findOne({correo})
        if(!usuario){
            const data = {
                nombre,
                correo,
                img,
                password:':P',
                google:true
            }
            usuario = new Usuario(data)
            await usuario.save()
        }

        //si el usuario en DB
        if(!usuario.estado){
            return res.status(401).json({msg:'Hable con el administrador, usuario bloqueado'})
        }

         //Generar JWT
         const token = generarJWT(usuario.id)
        res.json({usuario,token})
    } catch (error) {
        res.status(400).json({ok: false, msg:'El token no se pudo verificar'})
    }
    
}

export {
        login,
        googleSignIn
    }