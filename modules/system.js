//im only generating the model of the scheme not actually ussing information
const mongoose = require("mongoose");



const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const SystemSchema = Schema({
    adminID: ObjectId,
    token: {
        type: String,
        unique: true
    },
    email: { 
        type: String,
        unique: true,
        required: true
    },
    password: { 
        type: String,
        required: true
    }
});
const SystemModule = mongoose.model('system',SystemSchema);

module.exports = SystemModule;