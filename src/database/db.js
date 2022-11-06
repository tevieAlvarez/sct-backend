const {Pool} = require('pg')

//Conexion a la base de datos, se exporta la constante 'pool' para poder utilizarla en los controladores
/*const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'task_control',
    port: '5432'
});*/

//Servidor DB
const pool = new Pool ({
    host: 'ls-ecf08a168bec6d5cf9535b7ac2b5071e9fb69c34.ctuwkuqjnova.us-east-1.rds.amazonaws.com',
    user: 'dbmasteruser',
    password: '|Bqvo.5uR~nNO^|4_N!]e42z~nKDxYIA',
    database: 'dbControlCursos',
    port: '5432'
});

module.exports = pool