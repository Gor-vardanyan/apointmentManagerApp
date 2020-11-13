const mongoose = require("mongoose");
const mongoUri = "mongodb+srv://root:zcPDEjO2q7G2kHX8@cluster0.hofxn.mongodb.net/DentalClinic";
console.log(process.env.uri)
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=>{ console.log('conected to data base')})
.catch((error)=>{ console.error('there was a problem connecting to database' + error)});