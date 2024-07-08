import mongoose from "mongoose";

//Creamos el Schema
const RoleSchema = mongoose.Schema({
    rol: {
        type: String,
        required: true
    }
})

//Creamos el modelo dentro colocamos el nombre de la coleccion y le pasamos el schema, la coleccione ahora en mongo sera usuarios
const Role = mongoose.model('Role',RoleSchema);

//Exportamos el modelo
export default Role;