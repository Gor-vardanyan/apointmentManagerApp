// camps of model doctor doctorID, dni, name, lastname, secondlastname, email, password, phone
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const DoctorsModule = require('../modules/doctors');
const SystemModule = require("../modules/system");


const showDoctors = async (req, res) => {
    try {
        const alldates = await DoctorsModule.find({});
        res.send(alldates)
} catch (error) {console.log(error)};
};

const registerDoctor = async (req, res) => {
    let bodyData = req.body;
    let hashed_password = await bcrypt.hash(bodyData.password, 10);
    let query = {email: req.body.email};
    let admin = SystemModule.findOne(query)


        try {
            if(!admin == null){
                const doctors = await new DoctorsModule({
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
            }else{res.send({error: "login with admin"});};
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
    registerDoctor,
    showDoctors
}