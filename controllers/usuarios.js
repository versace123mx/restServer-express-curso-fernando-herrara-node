const usuariosGet = (req,res) =>{
    //res.send('Hello World des de el server')
    res.json({ msg: 'Methos GET' });
}

const usuariosPost = (req,res) =>{
    const {nombre} = req.body
    res.status(200).json({ msg: 'Methos POST', nombre });
}

//aqui le pasamos los parametros por Segmento
const usuariosPut = (req,res) => {
    const { id,id2 } = req.params;
    const body = req.body
    console.log(req.params)
    console.log(req.body)
    
    res.status(200).json({ msg: 'Methos PUT',id ,id2 , body});
}

//aqui le pasamos los parametros por Query String
const usuariosPatch  = (req,res) => {
    const queryString = req.query
    console.log(req.query)
    res.status(200).json({ msg: 'Methos PATCH', queryString });
}

const usuariosDelete = (req,res) => {
    res.status(200).json({ msg: 'Methos DELETE' });
}

export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}