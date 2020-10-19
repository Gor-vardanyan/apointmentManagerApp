// camps of model doctor doctorID, dni, name, lastname, secondlastname, email, password, phone
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const doctorsModel = require('../modules/doctors');

const registerDoctor = async (req, res) => {
    let bodyData = req.body;
    let hashed_password = await bcrypt.hash(bodyData.password, 10);
    try {
        const doctors = await new doctorsModel({
            dni: bodyData.dni,
            name: bodyData.name,
            lastname: bodyData.lastname,
		    email: bodyData.email,
            password: hashed_password,
            phone: bodyData.phone
        }).save();

        res.send({
            message: "Doctor added successfully.",
            dni: doctors.dni,
            name: doctors.name,
            lastname: doctors.lastname,
		    email: doctors.email,
            password: doctors.password,
            phone: doctors.phone
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

module.exports = {
    registerDoctor
}