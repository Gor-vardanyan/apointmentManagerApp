//im only generating the model of the scheme not actually ussing information

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const ClientsSchema = new Schema({
    clientID: ObjectId,
    dni: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
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
    phone: {
        type: String,
        required: true
    },
    date: { 
        type: ObjectId,
    },
    historic: Array //previous dates and clinic information of the client
});