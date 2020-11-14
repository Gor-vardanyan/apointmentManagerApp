// camps of model client clientID, dni, name, email, password, phone, date, historic
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
// const { exists, findOneAndUpdate } = require("../modules/clients");
const ClientsModule = require('../modules/clients');


const showClients = async (req, res) => {
    try {
        const alldates = await ClientsModule.find({});
        res.send(alldates)
} catch (error) {console.log(error)}
};

const showDatesClient = async (req, res) => {
    let dni = req.client_dni;
    try {
        const DatesClient = await ClientsModule.find({ dni });
        res.send(DatesClient)
} catch (error) {console.log(error)}
};

const registerClients = async (req, res) => {
    let bodyData = req.body;
    console.log(req.body)
    let hashed_password = await bcrypt.hash(bodyData.password, 10);
    try {
        const clients = await new ClientsModule({
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
            console.log(err)
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
    ClientsModule.findOneAndDelete({ dni })
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

const logInClient = async (req, res) => {
    let query = {email: req.body.email}
    let client = await ClientsModule.findOne(query);
    console.log(req.body)
    if(!client){
        res.status(500).send({
            message: "No existe el usuario"
        });
        
    }else{
        let passwordOk = await bcrypt.compare(req.body.password, client.password);
        if(passwordOk){
            if(!client.token){ // si no existe el campo token (o esta vacio) se asignará
                let token = jwt.sign(client.dni, process.env.jwt_encoder); // firma el dni y genera el token con el texto del env
                client.token = token; // pasa la firma del dni al campo token
                await ClientsModule.findOneAndUpdate(query,{ token }); // guarda el token en la coleccion cliente
            }
            
            res.send({
                user: client
            })
        }else{
            res.send({
                message: "Credenciales incorrectas"
            })
        }
        
    }

}

const logOutClient = async (req, res) =>{
    let dni = req.client_dni;
    await ClientsModule.findOneAndUpdate({dni},{token:null});
    res.send('Logged out');
}

const showClientId = async (req,res) => {
    ClientsModule.findOne({dni:req.client_dni})
    .then(resp => {
      res.send(resp)
    })
    .catch(error => console.log('There was a problem trying to show clients by Id.' + error))
  }

module.exports = {
    showClients,
    showDatesClient,
    registerClients,
    deleteClient,
    logInClient,
    logOutClient,
    showClientId
};