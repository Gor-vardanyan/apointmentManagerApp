require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db/db');
const {auth} = require('./middleware/auth')
const {authadmin} = require('./middleware/authadmin');


app.use(express.json());

const {showClients} = require('./controllers/clientsController');
const {registerClients} = require('./controllers/clientsController');
const {deleteClient} = require('./controllers/clientsController');
const {loginClient} = require('./controllers/clientsController');
const {logOut} = require('./controllers/clientsController');

const {registerDoctor} = require('./controllers/doctorsController');
const {showDoctors} = require('./controllers/doctorsController');

const {createDate} = require('./controllers/datesController');
const {showDates} = require('./controllers/datesController');
const {removeDate} = require('./controllers/datesController');

const { logOutAdmin } = require('./controllers/systemController');
const { loginAdmin } = require('./controllers/systemController');


app.get('/client/showAll',auth, showClients);
app.post( '/client/registerClients', registerClients);
app.get( '/client/delete', auth, deleteClient);
app.get( '/client/loginClient',auth, loginClient);
app.get( '/client/logOut', auth,logOut);

app.post( '/doctor/registerDoctor',authadmin, registerDoctor);
app.get('/doctor/showAll',auth, showDoctors);

app.get('/dates/showAll',showDates);
app.post('/dates/createDate', auth ,createDate)
app.get('/dates/removeDate', auth ,removeDate)

app.get( '/admin/loginAdmin',authadmin, loginAdmin);
app.get( '/admin/logoutAdmin',authadmin, logOutAdmin);



PORT = process.env.PORT || 3000;

//el json lo parseamos mediante express para su uso
app.use(express.json());

//app listen es un objeto de funcion callback de puerto sin paramteros que devuelve el console log con su posición en servidor
app.listen( PORT, ()=> console.log("el servidor esta en el puerto " + PORT ));