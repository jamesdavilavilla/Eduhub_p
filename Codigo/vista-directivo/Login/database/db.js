const mysql = require("mysql");
const conection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

conection.connect((error)=>{
    if(error){
        console.log("el error de conexión es : "+error);
        return;
    }
    console.log("CONECTADO A LA BASE DE DATOS!");
});
module.exports = conection;