import dotenv from 'dotenv';
import Server from './models/server.js'

dotenv.config();//este desde que carga el index localiza las variables de entorno y las pone globales, por eso es que se puede utilizar de esta manera
const servidor = new Server()//Iniciamos una intancia de nuestro servidor

servidor.listen()//llamamos al metodo listen








