import bcrypt from 'bcryptjs'
import Usuario from '../models/usuario.js'

const usuariosGet = async(req,res) =>{

    const {limite = 5, desde = 0} = req.query //Los parametros que bienen en la query

    if(isNaN(limite) || isNaN(desde)){
        return res.json({ msj: 'Los valores deben de ser numeros' });
    }

    //const usuarios = await Usuario.find({estado: true}).skip(desde).limit(limite)
    //const total = usuarios.length

    //Para este caso se crean dos promesas para que corra al mismo tiempo y se hace una destructuracion de arreglos
    const [total, usuarios] = await Promise.all([
            Usuario.countDocuments({estado: true}),
            Usuario.find({estado: true}).skip(desde).limit(limite)
        ])

    res.json({ total,usuarios });
}

const usuariosPost = async (req,res) => {

    const {nombre,correo,password,rol} = req.body
    //const usuario = new Usuario(body) insertando todo el body donde body seria const body = req.body
    const usuario = new Usuario({nombre,correo,password,rol})//creamos un objeto usuario y le asignamos los datos que vamos a guardar

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt) //Encriptamos la contraseña con el salt del objeto usuario.password

    //Guardar en DB
    await usuario.save()
    res.status(200).json({ usuario });
}

//aqui le pasamos los parametros por Segmento
const usuariosPut = async (req,res) => {

    const {id} = req.params
    const {_id, password,google,correo,...resto} = req.body //aqui estamos sacando los datos que no queremos actualizar

    //Validar contra base de datos
    if(password){
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password, salt) //Encriptamos la contraseña con el salt del objeto usuario.password
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true})//esto es para que en la respueta traiga los datos actualizados {new: true}
    res.status(200).json({ msg: 'Methos PUT', usuario});
}

//aqui le pasamos los parametros por Query String
const usuariosPatch  = (req,res) => {
    const queryString = req.query
    console.log(req.query)
    res.status(200).json({ msg: 'Methos PATCH', queryString });
}

const usuariosDelete = async (req,res) => {
    const {id} = req.params
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    res.status(200).json({ usuario });
}

export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}