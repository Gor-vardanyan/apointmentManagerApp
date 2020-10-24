// camps of model modelo date dateId, clientID, doctorID, date, status, comments
const DoctorsModel = require('../modules/doctors');
const ClientsModule = require('../modules/clients');
const DatesModel = require('../modules/dates');
const { query } = require('express');

/*
const showDates = async (req,res)=>{
    const alldates = await DatesModel.find({});
    res.send(alldates)
}
*/

const showDates = async (req,res)=>{
    try {
         const alldates = await DatesModel.find({});
         res.send(alldates)
 } catch (error) {console.log(error)};
 };

const createDate = async (req,res)=>{
    let client_dni = req.client_dni; // dato cargado de auth
    let bodyData = req.body; // datos traidos del body
    let doctor = await DoctorsModel.findOne({dni:bodyData.doctor});
    let client = await ClientsModule.findOne({dni:client_dni});
    let coincidenceFound = await DatesModel.findOne({date:bodyData.date})
    console.log(client)

    if( client !== null || doctor !== null ){
        console.log("entre1")
       if(coincidenceFound !== null){
            res.send({
                message:'This user already has a date, plase send an email for more informatión '
        });}else if(client !== null){
            let query = req.dni;
            let doctorDni = await DoctorsModel.findOne({query});
            let doctor_name1 = doctorDni.name;
            let client_name1 = client.name;
            const dates = await new DatesModel({
                doctorID: doctorDni._id,
                clientID: client._id,
                date: bodyData.date,
                status: true
            }).save();
  
            res.send({
                message: `Date created successfully for client ${client_name1} with doctor: ${doctor_name1}.`
            });
        }else{
            let query = req.dni
            let clientDni = await ClientsModule.findOne({query});
            let doctor_name1 = clientDni.name;
            let client_name1 = doctor.name;
            const dates = await new DatesModel({
                doctorID: doctor._id,
                clientID: clientDni._id,
                date: bodyData.date,
                status: true
            }).save();

            res.send({
                message: `Date created successfully for client ${client_name1} with doctor: ${doctor_name1}.`
            });
        }       
    }
    res.send('Couldnt\'t find either the client or the doctor');
};

const removeDateClient = async (req,res)=>{
    let client_dni = req.client_dni; // take from auth
    let client = await ClientsModule.findOne({dni:client_dni});

    if( !(client === null) ){
        const date = await DatesModel.findOneAndDelete({
            clientID: client._id,
        })
        res.send({
            message: `Date deleted successfully for Client ${client.dni} in date: ${date.date}.`
        });
    }
    res.send('Couldnt\'t find either the client');
};

const removeDateDoctor = async (req,res)=>{
    let doctor_email = req.doctor_email; // take from auth
    let doctor = await DoctorsModel.findOne({dni:doctor_email});// Select user from its dni and fix it in doctor

    if( !(doctor === null) ){
        const date = await DatesModel.findOneAndDelete({
            doctorID: doctor._id,
        })

        res.send({
            message: `Date deleted successfully for Doctor ${doctor.dni} in date: ${date.date}.`
        });
    }
    res.send('Couldnt\'t find either the client');
};

module.exports = {
    showDates,
    createDate,
    removeDateClient,
    removeDateDoctor
}