import mongoose from "mongoose";

//Creamos el Schema
const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    estado:{
        type: Boolean,
        required: true,
        default: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId, //este es el que indica que sera un tipo id objeto
        ref: 'Usuario', //este es la referencia asia el id del usuario
        required: true
    },
    usuarioModifico: {
        type: mongoose.Schema.Types.ObjectId, //este es el que indica que sera un tipo id objeto
        ref: 'Usuario', //este es la referencia asia el id del usuario
        required: true
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId, //este es el que indica que sera un tipo id objeto
        ref: 'Categoria', //este es la referencia asia el id de la categoria
        require: true
    },
    descripcion: {
        type: String,
    },
    disponible:{
        type: Boolean,
        default: true
    },
    imagen:{
        type: String,
    }
})

//Retornamos solo los datos que nesecitamos ver no el passsword, no el __v, no _id esto es del Schema y al _id le cambiamos el nombre visualmente
ProductoSchema.methods.toJSON = function(){
    const {__v,estado, ...data} = this.toObject();
    return data;
}

//Creamos el modelo dentro colocamos el nombre de la coleccion y le pasamos el schema, la coleccione ahora en mongo sera usuarios
const Producto = mongoose.model('Producto',ProductoSchema);

//Exportamos el modelo
export default Producto;