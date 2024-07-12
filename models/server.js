import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import router from '../routes/usuarios.js'
import routerAuth from '../routes/auth.js'
import routerCategorias from '../routes/categorias.js'
import routerProductos from '../routes/productos.js'
import routerSearch from '../routes/buscar.js'
import routerUpload from '../routes/uploads.js'
import routerUploadCloudinary from '../routes/uploadscloudinary.js'

import {dbConecction} from '../database/config.js'

class Server{

    constructor(){
        this.app = express()//Inicializa express
        this.port = process.env.PORT || 3000 //iniciamos el puerto de la varible de entorno
        this.corsOptions=this.cosrSeguridad()

        this.usuariosRoutePath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.categorias = '/api/categorias'
        this.productos = '/api/productos'
        this.buscar = '/api/buscar'
        this.upload = '/api/upload'
        this.uploadCloudinary = '/api/upload/cloudinary'

        //Conectar a base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares()

        //Rutas de la aplicacion
        this.routes()// cargamos las rutas de nuestro routes

    }

    async conectarDB(){
        await dbConecction()
    }

    middlewares(){
        this.app.use(cors(this.corsOptions))
        this.app.use(express.static('public')) //Directorio publico y es el que siempre se ejecuta en un principio en la carpeta publica del path /
        this.app.use(express.json()); //Habilitamos las respuestas json a un que asiendo pruebas no pasa nada si esta esto o no, actualizacion esto sirve para cuando nos mandan datos de tipo json, nuestro sistema sea capaz de entender que estamos recibiendo datos en formato json

        //FileUpload carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
        }))
    }

    routes(){
        this.app.use(this.authPath,routerAuth)//le decimos donde estan las rutas del endpoind el endpoint de entrada es /api/auth y en router ahi estan los metodos
        this.app.use(this.usuariosRoutePath,router)//le decimos donde estan las rutas del endpoind el endpoint de entrada es /api/usuarios y en router ahi estan los metodos
        this.app.use(this.categorias,routerCategorias)//le decimos donde estan las rutas del endpoind el endpoint de entrada es /api/categorias y en router ahi estan los metodos
        this.app.use(this.productos,routerProductos)//le decimos donde estan las rutas del endpoind el endpoint de entrada es /api/productos y en router ahi estan los metodos
        this.app.use(this.buscar,routerSearch)//le decimos donde estan las rutas del endpoind el endpoint de entrada es /api/buscar y en router ahi estan los metodos
        this.app.use(this.upload,routerUpload)//le decimos donde estan las rutas del endpoind el endpoint de entrada es /api/upload y en router ahi estan los metodos
        this.app.use(this.uploadCloudinary,routerUploadCloudinary)//le decimos donde estan las rutas del endpoind el endpoint de entrada es /api/upload/cloudinary y en router ahi estan los metodos
    }

    listen(){
        this.app.listen(this.port,() =>{
            console.log(`Server is running on port ${this.port}`)
        })
    }

    cosrSeguridad(){
        //console.log(process.env.URL_CONFIRMAR)
        var whitelist = [process.env.URL_CONFIRMAR,process.env.URL_GOOGLE_LONGIN]
        var corsOptions = {
            origin: function (origin, callback) {
                //console.log(whitelist.indexOf(origin))
                if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
                } else {
                    callback(new Error('No permitido por CORS'))
                }
            }
        }

        return corsOptions
    }

}

export default Server