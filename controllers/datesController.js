// camps of model modelo date dateId, clientID, doctorID, date, status, comments
const datesModel = require('../modules/dates');
const doctorsModel = require('../modules/doctors');
const clientsModule = require('../modules/clients');

const showDates = async (req,res)=>{
    const alldates = await datesModel.find({});
    res.send(alldates)
}

const createDate = async (req,res)=>{
    let client_dni = req.client_dni; // dato cargado de auth
    let bodyData = req.body; // datos traidos del body
    
    let doctor = await doctorsModel.findOne({dni:bodyData.doctor});
    let client = await clientsModule.findOne({dni:client_dni});

    if( !(client === null || doctor === null) ){
        const dates = await new datesModel({
            doctorID: doctor._id,
            clientID: client._id,
            date: bodyData.date,
            status: true
        }).save();

        res.send({
            message: `Date created successfully for client ${client.dni} with doctor: ${doctor.name} ${doctor.lastname}.`
        });
    }
    res.send('Couldnt\'t find either the client or the doctor');

};

const removeDate = async (req,res)=>{
    let client_dni = req.client_dni; // dato cargado de auth
    let client = await clientsModule.findOne({dni:client_dni});

    if( !(client === null) ){
        const date = await datesModel.findOneAndDelete({
            clientID: client._id,
        })

        res.send({
            message: `Date deleted successfully for client ${client.dni} for date ${date.date}.`
        });
    }
    res.send('Couldnt\'t find either the client');

};

module.exports = {
    showDates,
    createDate,
    removeDate
}