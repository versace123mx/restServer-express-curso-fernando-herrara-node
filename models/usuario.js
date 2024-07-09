import mongoose from "mongoose";

//Creamos el Schema
const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    imagen:{
        type: String
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

})
//Retornamos solo los datos que nesecitamos ver no el passsword, no el __v, no _id esto es del Schema y al _id le cambiamos el nombre visualmente
UsuarioSchema.methods.toJSON = function(){
    const {__v, password,_id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

//Creamos el modelo dentro colocamos el nombre de la coleccion y le pasamos el schema, la coleccione ahora en mongo sera usuarios
const Usuario = mongoose.model('Usuario',UsuarioSchema);

//Exportamos el modelo
export default Usuario;