// camps of model doctor doctorID, dni, name, lastname, secondlastname, email, password, phone
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const DatesModel = require("../modules/dates");
const DoctorsModule = require('../modules/doctors');
const SystemModule = require("../modules/system");


const showDoctors = async (req, res) => {
    let admin = req.admin_email;
    try {
        if( admin !== null){
            const allDoctors = await DoctorsModule.find({},'_id name email dni phone');
            res.send(allDoctors)
        }
    } catch (error) {
        console.log(error)};
};

const showDatesDoctor = async (req, res) => {
    let email = req.doctor_email;
    try {
        const Doctor = await DoctorsModule.findOne({email})
        const DatesDoctor = await DatesModel.find({ doctorID:Doctor._id });
        res.send(DatesDoctor)
} catch (error) {console.log(error)}
};

const registerDoctor = async (req, res) => {
    let admin_email = req.admin_email;
    let bodyDatadoctor = req.body;
    let hashed_password = await bcrypt.hash(bodyDatadoctor.pass, 10);
    let query = req.body;
    let admin = await DoctorsModule.findOne({query})

        try {
            if(admin_email !== null){
                if(admin === null){
                    const doctors = await new DoctorsModule({
                        dni: bodyDatadoctor.dni,
                        name: bodyDatadoctor.name,
                        email: bodyDatadoctor.email,
                        password: hashed_password,
                        phone: bodyDatadoctor.phone
                    }).save();
                    let doctor = {
                        _id:doctors._id,
                        dni:doctors.dni,
                        name:doctors.name,
                        email:doctors.email,
                        phone:doctors.phone
                    }
                    res.send(
                        doctor
                    );
                }else{res.send({error: "login with admin"});};
            }
        } catch (err) {
            if (err.code === 11000) { // E11000 duplicate key error (unique true)
                res.status(409); // conflict
                res.send({
                    error: err
                });
            } else {
                res.send(err);	
            };
        };
    
};

const logInDoctor = async (req, res) => {
    let query = {email: req.body.email}
    let doctor = await DoctorsModule.findOne(query);

    if(!doctor){
        res.send({
            message: "No existe el usuario"
        });
    }else{
        let passwordOk = await bcrypt.compare(req.body.password, doctor.password);
        if(passwordOk){
            //here we create the token or asign it
            if(!doctor.token){ 
                let token = jwt.sign(doctor.dni, process.env.jwt_doctorToken); // firma el pasword y genera el token con el texto del env
                doctor.token = token; // pasa la firma del password al campo token
                await DoctorsModule.findOneAndUpdate(query,{ token }); // guarda el token en la coleccion doctor
            }
            
            res.send({
                doctor
            })
        }else{
            res.send({
                message: "Credenciales incorrectas"
            })
        }   
    }
};

const logOutDoctor = async (req, res) =>{
    let email = req.doctor_email;
    await DoctorsModule.findOneAndUpdate({email},{token: null});
    res.send('Logged out');
};

const deleteDoctor = async (req, res) => {
    let email = req.doctor_email;
    DoctorsModule.findOneAndDelete({ dni })
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

const showDoctorID = async (req,res)=>{
    DoctorsModule.findOne({email:req.doctor_email})
    .then(resp=>{
        res.send(resp)
    })
    .catch(error => console.log('There was a problem trying to show Doctor by Id.' + error))
}

module.exports = {
    registerDoctor,
    showDoctors,
    showDatesDoctor,
    logInDoctor,
    logOutDoctor,
    deleteDoctor,
    showDoctorID

}