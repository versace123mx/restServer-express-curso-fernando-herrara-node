import mongoose from 'mongoose'

const dbConecction = async() => {

    try {
        const db = await mongoose.connect(process.env.MONGO_ATLAS)
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`Mongo db conectado en ${url}`)
    } catch (error) {
        console.log(error)
        console.log('error de conexion',error.message);
        throw new Error('Error a la hora de iniciar la base de datos')
    }
}


export{
    dbConecction
}