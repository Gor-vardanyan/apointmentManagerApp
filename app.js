require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db/db');
const {auth} = require('./middleware/auth')
const {authdoctor} = require('./middleware/authdoctor');
const {authadmin} = require('./middleware/authadmin');
const {tokenCheck} = require('./middleware/tokenchek');


PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT,OPTIONS, DELETE");
    next();
  });
//El json lo parseamos mediante express para su uso
app.use(express.json());

//testear conexion
app.post('/live',auth,(req,res)=>{
    res.send('hello');
});

app.get('/live',(req,res)=>{
    res.send('hello');
});
    ////// Routing Client /////
const {showClientId} = require('./controllers/clientsController');
const {showClients} = require('./controllers/clientsController');
const {registerClients} = require('./controllers/clientsController');
const {deleteClient} = require('./controllers/clientsController');
const {logInClient} = require('./controllers/clientsController');
const {logOutClient} = require('./controllers/clientsController');
const {showDatesClient} = require('./controllers/clientsController');

    //////////////////

    ////// Routing Doctor /////
const {showDoctorID} = require('./controllers/doctorsController');
const {showDoctors} = require('./controllers/doctorsController');
const {registerDoctor} = require('./controllers/doctorsController');
const {logInDoctor} = require('./controllers/doctorsController');
const {logOutDoctor} = require('./controllers/doctorsController');
const {deleteDoctor} = require('./controllers/doctorsController');
const {showDatesDoctor} = require('./controllers/doctorsController');
    //////////////////

    ////// Routing Dates /////
const {showDates} = require('./controllers/datesController');
const {createDate} = require('./controllers/datesController');
const {removeDateClient} = require('./controllers/datesController');
    //////////////////

    ////// Routing Admin /////
const { logOutAdmin } = require('./controllers/systemController');
const { logInAdmin } = require('./controllers/systemController');
    //////////////////

    ////// CRUD Client ///// All worked fine
app.post('/client/getClient',auth, showClientId); //token from client required
app.post('/client/showAll', showClients); //token from Admin required
app.post( '/client/registerClients', registerClients); //needs dni password name email and phone
app.post( '/client/logInClient', logInClient); //only asks for email and pasword
app.post( '/client/logOutClient', auth, logOutClient); //only needs to be loged for it's token
app.post( '/client/delete', auth, deleteClient); // search through dni and deletes, requires token from Client
app.post('/client/dates',auth, showDatesClient)// searches in dates his id

    //////////////////

    ////// CRUD Doctor //////
app.post('/doctor/getDoctor',authdoctor, showDoctorID); //token from Admin required
app.post('/doctor/showAll', authadmin, showDoctors);//token from Admin required
app.post( '/doctor/registerDoctor', authadmin, registerDoctor); // token from Admin required
app.post( '/doctor/logInDoctor', logInDoctor); //only asks for email and pasword
app.post( '/doctor/logOut', authdoctor, logOutDoctor); //only needs to be loged
app.post( '/doctor/delete', authadmin, deleteDoctor); // search through dni and deletes, requires token from Admin
app.post('/doctor/dates',authdoctor, showDatesDoctor)// searches in dates his id    
    //////////////////


    ////// CRUD Dates ////// All worked fine
app.post('/dates/showAll', auth, showDates);
app.post('/dates/doctor/showAll', authdoctor, showDates); //show dates of the doctor with it's token 
app.post('/dates/createDate', tokenCheck, createDate) // controles the token user (doctor/client) asks for doctors name and the clients token or the clients dni and doctors token
app.post('/dates/removeDateClient', tokenCheck, removeDateClient) //if is doctor need dni of client, if it's client needs to be loged in for it's token
    //////////////////

    ////// CRUD Admin ////// All worked fine
app.post( '/admin/logInAdmin', logInAdmin);
app.post( '/admin/logOutAdmin', authadmin, logOutAdmin);
    //////////////////


//app listen es un objeto de funcion callback de puerto sin paramteros que devuelve el console log con su posición en servidor
app.listen( PORT, ()=> console.log("el servidor esta en el puerto " + PORT ));