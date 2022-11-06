const pool = require('../database/db')

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM user_');
    res.status(200).json(response.rows);
}
 
const createUser = async(req, res) => {
    const {nombre, apellido, correo, password, tipo} = req.body;
    const columnas = '(name, last_name, email, password, id_user_type)';
    const values = '($1, $2, $3, $4, $5)';
    const data = [nombre, apellido, correo, password, tipo];
    console.log(data)
    await pool.query('INSERT INTO user_' + columnas + 'VALUES' + values, data);
    res.json({message: 'usuario creado'});
}
 
const getUser = async(req, res) => {
    const idUser = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM user_ WHERE id_user = $1', [idUser]);
    res.json(response.rows[0]);
}
 
const login = async(req, res) =>{
    const {email, password} = req.body;
    const response = await pool.query('SELECT * FROM user_ WHERE email = $1 AND password = $2', [email, password]);
    if(response.rows[0]){
        console.log('Exito');
        res.json({
            message: 'success',
            idUsuario: response.rows[0].id_user,
            tipoUsuario: response.rows[0].id_user_type
        });
    } else{
        console.log('Error');
        res.json({message: 'error auth'});
    }
}

module.exports = {
    getUsers,
    createUser,
    getUser,
    login
}