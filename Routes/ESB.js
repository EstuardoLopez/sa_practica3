var express = require('express');
var router = express.Router();
var config =  require('../Constantes/config');
const axios = require('axios');

const bodyParser = require('body-parser');
const cors = require('cors');

router.use(bodyParser.json());
router.use(cors());

router.post(config.urls.ESB.Restaurante.registrarPedido, function (req, res) {
    var url =  config.urls.root + config.urls.Restaurante.puerto + config.urls.Restaurante.root + config.urls.Restaurante.registrarPedido;
    var item = req.body.item;
    print('Cliente','Registrar pedido en restaurante');
    axios.post(url, { item })
    .then(res_ => {
        res.send(res_.data);
    });
    //res.send("Peticion encontrada");
});

router.post(config.urls.ESB.Restaurante.consultarEstadoPedido, function(req, res){
    var url =  config.urls.root + config.urls.Restaurante.puerto + config.urls.Restaurante.root + config.urls.Restaurante.consultarEstadoPedido;
    var item = req.body.item;
    print('Cliente','Consultar estado del pedido en restaurante');
    axios.post(url, { item })
    .then(res_ => {
        res.send(res_.data);
    });
    //console.log('restaurante consultar estado');
    //res.send("Peticion encontrada");
});

router.post(config.urls.ESB.Restaurante.registrarEntrega, function(req, res){
    var url =  config.urls.root + config.urls.Restaurante.puerto + config.urls.Restaurante.root + config.urls.Restaurante.registrarEntrega;
    var item = req.body.item;
    print('Repartidor','Registrar pedido entregado al cliente');
    axios.post(url, { item })
    .then(res_ => {
        res.send(res_.data);
    });
    //console.log('restaurante registrar estado');
    //res.send("Peticion encontrada");
});

router.post(config.urls.ESB.Repartidor.registrarPedido, function (req, res) {
    var url =  config.urls.root + config.urls.Repartidor.puerto + config.urls.Repartidor.root + config.urls.Repartidor.registrarPedido;
    var item = req.body.item;
    print('Restaurante','Registrar entrega de depedido a repartidor');
    axios.post(url, { item })
    .then(res_ => {
        res.send(res_.data);
    });
    //console.log('repartidor registrar pedido');
    //res.send("Peticion encontrada");

});

router.post(config.urls.ESB.Repartidor.consultarEstado, function(req, res){
    var url =  config.urls.root + config.urls.Repartidor.puerto + config.urls.Repartidor.root + config.urls.Repartidor.consultarEstado;
    var item = req.body.item;
    print('???','------');
    axios.post(url, { item })
    .then(res_ => {
        res.send(res_.data);
    });
    //console.log('repartidor registrar entrega');
    //res.send("Peticion encontrada");
});

function print(origen,msg){
    console.log('\tPeticion recibida desde: '+ origen + ' -> ' + msg);
}



module.exports = router;
