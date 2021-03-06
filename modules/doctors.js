//im only generating the model of the scheme not actually ussing information
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const DoctorsSchema = new Schema({
    doctorID: ObjectId,
    token:{
        type: String
    },
    dni: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    secondlastname: {
        type: String
    },
    email: { 
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone:  {
        type: String,
        required: true
    },
});
const DoctorsModule = mongoose.model('doctors', DoctorsSchema);

module.exports = DoctorsModule;