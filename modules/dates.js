//im only generating the model of the scheme not actually ussing information

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const DatesSchema = new Schema({
    dateId: ObjectId,
    clientID:{ 
        type: ObjectId,
        required: true
    }, 
    doctorID: { 
        type: ObjectId,
        required: true
    },
    date: { 
        type: String,
        required: true
    },
    status:{ 
        type: Boolean,
        required: true
    },
    comments: String 
});