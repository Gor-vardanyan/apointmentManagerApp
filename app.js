require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db/db');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

app.use(express.json());


const doctorsController = require('./controllers/doctorsController');
const datesController = require('./controllers/datesController');
const {showClients} = require('./controllers/clientsController');
const {registerClinets} = require('./controllers/clientsController');
const {deleteClient} = require('./controllers/clientsController');


app.get('/client/showAll', showClients);
app.post( '/client/registerClients', registerClinets);
app.get( '/client/delete', deleteClient);

PORT = 3000;

//el json lo parseamos mediante express para su uso
app.use(express.json());

//app listen es un objeto de funcion callback de puerto sin paramteros que devuelve el console log con su posición en servidor
app.listen( PORT, ()=> console.log("el servidor esta en el puerto " + PORT ));