const express = require('express');
var esbRouter = require('../Routes/ESB');
var config = require('../Constantes/config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/esb', esbRouter);
//var puerto = '3013'
var puerto = config.urls.ESB.puerto;

app.listen(puerto, function() {
  console.log('*************************************************************');
  console.log('**************************   ESB    *************************');
  console.log('*************************************************************');
  console.log('escuchando en ' + config.urls.root + puerto);
});






