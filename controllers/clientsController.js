// camps of model client clientID, dni, name, email, password, phone, date, historic

const ClientsModule = require('../modules/clients');

const  showClients = (req, res) => {
     ClientsModule.find({})
     .then(findall => {
         res.send(findall)})
     .catch(error=>{console.log(error)});
};

const registerClinets = async (req, res) => {
    let bodyData = req.body;
    try {
        const clients = await new ClientsModule({
            dni: bodyData.dni,
            name: bodyData.name,
		    email: bodyData.email,
            password: bodyData.password,
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
    
    let dni = req.body.dni;

    ClientsModule.findOneAndDelete({ dni })
    .then ( (deleted) => {
		
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
}

module.exports = {
    showClients,
    registerClinets,
    deleteClient
};