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
    let doctor;
    let client;
    if(req.is_doctor){ //Doctor
        doctor = await DoctorsModel.findOne({name:req.doctor_email});// dato cargado de auth
        client = await ClientsModule.findOne({dni:req.body.dni});// datos traidos del body
    }else{ //Client
        doctor = await DoctorsModel.findOne({name:req.body.name});// datos traidos del body
        client = await ClientsModule.findOne({dni:req.client_dni});// dato cargado de auth
    }
    if( client === null || doctor === null){
        return res.send('Couldnt\'t find either the client or the doctor');
    }
    let coincidenceFound = await DatesModel.findOne({clientID: client._id, status: true})
    if(coincidenceFound !== null){
        return res.send({message:'This Client already has a date, plase contact your doctor for more informatión '});
    }
    const dates = await new DatesModel({
        doctorID: doctor._id,
        clientID: client._id,
        date: req.body.date,
        status: true
    }).save();

    const updateClient = await ClientsModule.findOneAndUpdate({
        _id: client._id
    },{
        $push: { 
            historic: {
                doctorID: doctor._id,
                clientID: client._id,
                date: req.body.date,
                status: true
            }
        }
    });

    client = await ClientsModule.findOne({_id: client._id});

    res.send({
        info:{ doctorID: doctor.name,
                date: req.body.date
        },
        user:client,
        message: `Date created successfully for client ${client.name} with doctor: ${doctor.name}.`
    });

};

const removeDateClient = async (req,res)=>{
    let client;
    if(req.is_doctor){ //Doctor
        client = await ClientsModule.findOne({dni:req.body.dni});// dato cargado de auth
    }else{ //Client
        client = await ClientsModule.findOne({dni:req.client_dni});// dato cargado de auth
    }
    if( !(client === null) ){
        const date = await DatesModel.findOneAndDelete({
            clientID: client._id,
            status:true
        })

        let historico = [];
        client.historic.forEach((item,nodo)=>{
            if(item.status != true){
                historico.push(item)
            }
        })
        await ClientsModule.findOneAndUpdate({
            _id:client._id
        },{$set:{historic:historico}})
        client = await ClientsModule.findOne({dni:req.client_dni});
        res.send({
            message: `Date deleted successfully for Client ${client.dni} in date: ${date.date}.`,
            user:client
        });
    }
    res.send({message:'Couldnt\'t find either the client'});
};


module.exports = {
    showDates,
    createDate,
    removeDateClient
}