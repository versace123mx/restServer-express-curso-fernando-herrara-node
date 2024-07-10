import Categoria from '../models/categoria.js'

//ObtenerCategorias - paginado - total, populate
const ObtenerCategorias = async (req, res) => {
    const {limite = 5, desde = 0} = req.query //Los parametros que bienen en la query

    if(isNaN(limite) || isNaN(desde)){
        return res.json({ msj: 'Los valores deben de ser numeros' });
    }

    //Para este caso se crean dos promesas para que corra al mismo tiempo y se hace una destructuracion de arreglos
    const [total, categorias] = await Promise.all([
            Categoria.countDocuments({estado: true}),
            Categoria.find({estado: true}).skip(desde).limit(limite).populate('usuario','nombre') //skip es como un inicio y limit pues ya se da a entender y populate es para traer el nombre de usuario que esta asignado a ese id
        ])

    res.json({ total,categorias });
}

//obtenerCategoria - populate {}
const obtenerCategoria = async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre')

    res.json(categoria)
}

//CrearCategoria - populate {}
const crearCategoria = async (req, res) =>{
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre})
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)
    //Guardamos en la base de datos
    await categoria.save()
    res.status(201).json(categoria)

}

//actualizarCategoria
const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true})
    res.status(200).json(categoria)
}

//borrarCategoria - estado : false
const borrarCategoria = async (req, res) => {
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true}).populate('usuario','nombre')//{new:true} esto es para que en la respuesta se vea el cambio reflejado
    res.status(200).json(categoriaBorrada)
}


export {
    ObtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}