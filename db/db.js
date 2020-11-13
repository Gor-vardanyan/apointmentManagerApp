const mongoose = require("mongoose");
const mongoUri = process.env.uri || 'mongodb://localhost:27017/heroku-mongo'
mongoose.connect(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=>{ console.log('conected to data base')})
.catch((error)=>{ console.error('there was a problem connecting to database' + error)});