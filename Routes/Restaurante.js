var express = require('express');
var router = express.Router();
var Pedidos =  require('../Constantes/Pedidos');

const bodyParser = require('body-parser');
const cors = require('cors');

router.use(bodyParser.json());
router.use(cors());

var blnPrimerPedido = true;

router.post('/RegistrarPedido', function (req, res) {
    var pedidoNuevo = req.body.item;
    console.log('elopez>>> Nuevo pedido recibido: ');
    console.log(pedidoNuevo);
    //console.info('Primer pedido', blnPrimerPedido);
    if(blnPrimerPedido){
        Pedidos.recibidos = new Array();
        Pedidos.recibidos.push(pedidoNuevo);
        blnPrimerPedido = false;
    }else{
        Pedidos.recibidos.push(pedidoNuevo);
    }

    //console.log('recibidos: ',Pedidos.recibidos);
    res.send("Peticion encontrada");

});

router.post('/ConsultarEstado', function(req, res){
    var result = {codigo:0, msg:''};
    var pedidoBuscado = req.body.item;
    console.log('elopez>>> Consultando estado del pedido');
    console.log('Pedido buscado: ', pedidoBuscado);
    
    var itemEncontrado = null;
    Pedidos.recibidos.forEach(itemPedido => {
        if(itemPedido.idPedido == pedidoBuscado.idPedido){
            itemEncontrado = itemPedido;
        }
    });


    if(itemEncontrado == null){
        result.msg = 'No se encontro el pedido indicado';
    }else{
        result.codigo = 1;
        if(itemEncontrado.estado == 1){
            result.msg = 'El pedido se encuntra en preparacion';
        }else if(itemEncontrado.estado == 2){
            result.msg = 'El pedido se encuntra en camino';
        }else if(itemEncontrado.estado == 3){
            result.msg = 'El pedido se encuntra entregado al cliente';
        }
        
    }

    res.send({result});
});

router.post('/RegistrarEntrega', function(req, res){
    var result = {codigo:0, msg:''};
    var pedidoBuscado = req.body.item;
    console.log('elopez>>> Registrando entrega del pedido');
    
    contador = 0;
    indexItem = 0;
    var itemEncontrado = null;
    Pedidos.recibidos.forEach(itemPedido => {
        if(itemPedido.idPedido == pedidoBuscado.idPedido){
            itemEncontrado = itemPedido;
            indexItem = contador;
        }
        contador++;
    });


    if(itemEncontrado == null){
        result.msg = 'No se encontro el pedido indicado';
    }else{
        result.codigo = 1;
        Pedidos.recibidos[indexItem].estado = 3;        
    }

    res.send({result});
});



module.exports = router;
