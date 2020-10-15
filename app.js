const express = require('express');
const app = express();
const mongoose = require('mongoose');

PORT = 3000;

//el json lo parseamos mediante express para su uso
app.use(express.json());

//app listen es un objeto de funcion callback de puerto sin paramteros que devuelve el console log con su posición en servidor
app.listen( PORT, ()=> console.log("el servidor esta en el puerto " + PORT ));