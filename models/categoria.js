import mongoose from "mongoose";

//Creamos el Schema
const CategoriaSchema = mongoose.Schema({
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
        }
})

//Retornamos solo los datos que nesecitamos ver no el passsword, no el __v, no _id esto es del Schema y al _id le cambiamos el nombre visualmente
CategoriaSchema.methods.toJSON = function(){
    const {__v,estado, ...data} = this.toObject();
    return data;
}


//Creamos el modelo dentro colocamos el nombre de la coleccion y le pasamos el schema, la coleccione ahora en mongo sera Categoria
const Categoria = mongoose.model('Categoria',CategoriaSchema);

//Exportamos el modelo
export default Categoria;