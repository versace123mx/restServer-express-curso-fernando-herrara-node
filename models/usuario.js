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
//Retornamos solo los datos que nesecitamos ver no el passsword, no el __v, esto es del Schema
UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}

//Creamos el modelo dentro colocamos el nombre de la coleccion y le pasamos el schema, la coleccione ahora en mongo sera usuarios
const Usuario = mongoose.model('Usuario',UsuarioSchema);

//Exportamos el modelo
export default Usuario;