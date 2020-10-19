// camps of model client clientID, dni, name, email, password, phone, date, historic
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { exists, findOneAndUpdate } = require("../modules/clients");
const clientsModule = require('../modules/clients');

const  showClients = (req, res) => {
     clientsModule.find({})
     .then(findall => {
         res.send(findall)})
     .catch(error=>{console.log(error)});
};

const registerClients = async (req, res) => {
    let bodyData = req.body;
    let hashed_password = await bcrypt.hash(bodyData.password, 10);
    try {
        const clients = await new clientsModule({
            dni: bodyData.dni,
            name: bodyData.name,
		    email: bodyData.email,
            password: hashed_password,
            phone: bodyData.phone
        }).save();

        res.send({
            message: "Account created successfully.",
            dni: clients.dni,
            name: clients.name,
		    email: clients.email,
            password: clients.password,
            phone: clients.phone
        });
		
	} catch (err) {
        if (err.code === 11000) { // E11000 duplicate key error (unique true)
			res.status(409); // conflict
			res.send({
				error: "Email already used."
			});
		} else {
			res.send(err);	
		};
	};
};

const deleteClient = async (req, res) => {
    let dni = req.client_dni;
    clientsModule.findOneAndDelete({ dni })
    .then (deleted => {
		
		if (deleted) {
			res.send({
				message: `Client with DNI ${deleted.dni} name: ${deleted.name} email: ${deleted.email} deleted`
			});
		} else {
			res.status(404);
			res.send({
				error: `Didn't find client with DNI ${dni}.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
};

const loginUser = async (req, res) => {
    let query = {email: req.body.email}
    let client = await clientsModule.findOne(query);

    if(!client){
        res.send({
            message: "No existe el usuario"
        });
    }else{
        let passwordOk = await bcrypt.compare(req.body.password, client.password);
        if(passwordOk){
            if(!client.token){ // si no existe el campo token (o esta vacio) se asignará
                let token = jwt.sign(client.dni, process.env.jwt_encoder); // firma el pasword y genera el token con el texto del env
                client.token = token; // pasa la firma del password al campo token
                await clientsModule.findOneAndUpdate(query,{ token }); // guarda el token en la coleccion cliente
            }
            
            res.send({
                token: client.token,
                name: client.username,
                email: client.email
            })
        }else{
            res.send({
                message: "Credenciales incorrectas"
            })
        }
        
    }

}

const logOut = async (req, res) =>{
    let dni = req.client_dni;
    await clientsModule.findOneAndUpdate({dni},{token:null});
    res.send('Logged out');
}

module.exports = {
    showClients,
    registerClients,
    deleteClient,
    loginUser,
    logOut
};