require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db/db');
const {auth} = require('./middleware/auth')
const {authadmin} = require('./middleware/authadmin');

PORT = process.env.PORT || 3000;

//El json lo parseamos mediante express para su uso
app.use(express.json());

    ////// Routing Client /////
const {showClients} = require('./controllers/clientsController');
const {registerClients} = require('./controllers/clientsController');
const {deleteClient} = require('./controllers/clientsController');
const {logInClient} = require('./controllers/clientsController');
const {logOutClient} = require('./controllers/clientsController');
    //////////////////

    ////// Routing Doctor /////
const {showDoctors} = require('./controllers/doctorsController');
const {registerDoctor} = require('./controllers/doctorsController');
//const {logInDoctor} = require('./controllers/doctorController');
//const {logOutDoctor} = require('./controllers/doctorController');
//const {deleteDoctor} = require('./controllers/doctorController');
    //////////////////

    ////// Routing Dates /////
const {showDates} = require('./controllers/datesController');
const {createDate} = require('./controllers/datesController');
const {removeDate} = require('./controllers/datesController');
    //////////////////

    ////// Routing Admin /////
const { logOutAdmin } = require('./controllers/systemController');
const { logInAdmin } = require('./controllers/systemController');
    //////////////////

    ////// CRUD Client ///// All worked fine +showAll needs authAdmin
app.get('/client/showAll', showClients); //token from Admin required
app.post( '/client/registerClients', registerClients); //needs dni password name email and phone
app.get( '/client/logInClient', logInClient); //only asks for email and pasword
app.get( '/client/logOutClient', auth, logOutClient); //only needs to be loged
app.get( '/client/delete', auth, deleteClient); // search through dni and deletes, requires token from Client
    //////////////////

    ////// CRUD Doctor //////
app.get('/doctor/showAll', auth, showDoctors);//token from Admin required
app.post( '/doctor/registerDoctor', registerDoctor); // token from Admin required
//app.get( '/doctor/loginDoctor', loginDoctor); //only asks for email and pasword
//app.get( '/doctor/logOut', authdoctor,logOutDoctor); //only needs to be loged
//app.get( '/doctor/delete', authadmin, deleteDoctor); // search through dni and deletes, requires token from Admin
    //////////////////


    ////// CRUD Dates //////
app.get('/dates/showAll',showDates);
app.post('/dates/createDate', auth ,createDate)
app.get('/dates/removeDate', auth ,removeDate)
    //////////////////

    ////// CRUD Admin //////
app.get( '/admin/loginAdmin', logInAdmin);
app.get( '/admin/logoutAdmin', logOutAdmin);
    //////////////////




//app listen es un objeto de funcion callback de puerto sin paramteros que devuelve el console log con su posición en servidor
app.listen( PORT, ()=> console.log("el servidor esta en el puerto " + PORT ));