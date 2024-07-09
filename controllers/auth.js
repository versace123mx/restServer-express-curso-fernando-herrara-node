import bcrypt from 'bcryptjs'
import Usuario from '../models/usuario.js'
import generarJWT   from '../helpers/generarJWT.js'

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

export {
        login
    }