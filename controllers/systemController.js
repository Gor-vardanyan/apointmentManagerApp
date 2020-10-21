// camps of model client clientID, dni, name, email, password, phone, date, historic
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { exists, findOneAndUpdate } = require("../modules/clients");
const SystemModule = require('../modules/system');
const clientsModule = require('../modules/clients');
const doctorsModel = require('../modules/doctors');
const datesModel = require('../modules/dates');


const loginAdmin = async (req, res) => {
    let query = {email: req.body.email}
    let admin = await SystemModule.findOne(query);

    if(!admin){
        res.send({
            message: "No existe el usuario"
        });
    }else{
        let passwordOk = await bcrypt.compare(req.body.password, admin.password);
        if(passwordOk){
            if(!admin.token){ // si no existe el campo token (o esta vacio) se asignará
                let token = jwt.sign(admin.email, process.env.jwt_admin); // firma el pasword y genera el token con el texto del env
                admin.token = token; // pasa la firma del password al campo token
                console.log(token)
                await SystemModule.findOneAndUpdate(query,{ token }); // guarda el token en la coleccion cliente
            }
            
            res.send({
                token: admin.token,
                email: admin.email
            })
        }else{
            res.send({
                message: "Credenciales incorrectas"
            })
        }   
    }
}

const logOutAdmin = async (req, res) =>{
    let email = req.admin_email;
    await SystemModule.findOneAndUpdate({email},{token:null});
    res.send('Logged out');
}

module.exports = {
    loginAdmin,
    logOutAdmin
};