import Producto from '../models/producto.js'

//ObtenerCategorias - paginado - total, populate
const ObtenerProductos = async (req, res) => {
    const {limite = 5, desde = 0} = req.query //Los parametros que bienen en la query

    if(isNaN(limite) || isNaN(desde)){
        return res.json({ msj: 'Los valores deben de ser numeros' });
    }

    //Para este caso se crean dos promesas para que corra al mismo tiempo y se hace una destructuracion de arreglos
    const [total, productos] = await Promise.all([
            Producto.countDocuments({estado: true}),
            Producto.find({estado: true}).skip(desde).limit(limite).populate('usuario','nombre') //skip es como un inicio y limit pues ya se da a entender y populate es para traer el nombre de usuario que esta asignado a ese id
        ])

    res.json({ total,productos });
}

//obtenerCategoria - populate {}
const obtenerProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.where({ categoria: id }).populate('usuario','nombre')
    res.json(producto)
}

//CrearCategoria - populate {}
const crearProducto = async (req, res) =>{
    const nombre = req.body.nombre.toUpperCase();
    const productoDB = await Producto.findOne({nombre})
    if(productoDB){
        return res.status(400).json({
            msg: `El Producto ${productoDB.nombre} ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id,
        usuarioModifico: req.usuario._id,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
    }

    const producto = new Producto(data)
    //Guardamos en la base de datos
    await producto.save()
    res.status(201).json(producto)

}

//actualizarCategoria
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase()
    data.usuarioModifico = req.usuario._id

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true})
    res.status(200).json(producto)
}

//borrarCategoria - estado : false
const borrarProducto = async (req, res) => {
    const { id } = req.params;
    const categoriaBorrada = await Producto.findByIdAndUpdate(id,{estado:false},{new:true}).populate('usuario','nombre')//{new:true} esto es para que en la respuesta se vea el cambio reflejado
    res.status(200).json(categoriaBorrada)
}


export {
    ObtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}