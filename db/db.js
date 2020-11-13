const mongoose = require("mongoose");
const mongoUri = process.env.mongoUri
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=>{ console.log('conected to data base')})
.catch((error)=>{ console.error('there was a problem connecting to database' + error)});