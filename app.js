require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db/db');
const {auth} = require('./middleware/auth')


app.use(express.json());

const {showClients} = require('./controllers/clientsController');
const {registerClients} = require('./controllers/clientsController');
const {deleteClient} = require('./controllers/clientsController');
const {loginUser} = require('./controllers/clientsController');
const {logOut} = require('./controllers/clientsController');

const {registerDoctor} = require('./controllers/doctorsController');

const {createDate} = require('./controllers/datesController');
const {showDates} = require('./controllers/datesController');
const {removeDate} = require('./controllers/datesController');


app.get('/client/showAll',auth, showClients);
app.post( '/client/registerClients', registerClients);
app.get( '/client/delete', auth, deleteClient);
app.get( '/client/loginUser', loginUser);
app.get( '/client/logOut', auth,logOut);

app.post( '/doctor/registerDoctor', registerDoctor);

app.get('/dates/showAll',showDates);
app.post('/dates/createDate', auth ,createDate)
app.get('/dates/removeDate', auth ,removeDate)


PORT = process.env.PORT || 3000;

//el json lo parseamos mediante express para su uso
app.use(express.json());

//app listen es un objeto de funcion callback de puerto sin paramteros que devuelve el console log con su posición en servidor
app.listen( PORT, ()=> console.log("el servidor esta en el puerto " + PORT ));