import express from 'express'
import cors from 'cors'

import router from '../routes/usuarios.js'
import routerAuth from '../routes/auth.js'
import routerCategorias from '../routes/categorias.js'

import {dbConecction} from '../database/config.js'

class Server{

    constructor(){
        this.app = express()//Inicializa express
        this.port = process.env.PORT || 3000 //iniciamos el puerto de la varible de entorno
        this.corsOptions=this.cosrSeguridad()

        this.usuariosRoutePath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.categorias = '/api/categorias'

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
    }

    routes(){
        this.app.use(this.authPath,routerAuth)//le decimos donde estan las rutas del endpoind el endpoint de entrada es /api/auth y en router ahi estan los metodos
        this.app.use(this.usuariosRoutePath,router)//le decimos donde estan las rutas del endpoind el endpoint de entrada es /api/usuarios y en router ahi estan los metodos
        this.app.use(this.categorias,routerCategorias)//le decimos donde estan las rutas del endpoind el endpoint de entrada es /api/usuarios y en router ahi estan los metodos
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
                if (whitelist.indexOf(origin) !== -1 || !origin) {
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