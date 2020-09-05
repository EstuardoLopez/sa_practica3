const express = require('express');
const app = express();
const readline = require('readline');
const axios = require('axios');
var config =  require('../Constantes/config');

//var puerto = '3010';
var puerto = config.urls.Cliente.puerto;
var urlESB = config.urls.root + config.urls.ESB.puerto;
var urlRegistrarPedido = urlESB + config.urls.ESB.root + config.urls.ESB.Restaurante.registrarPedido;
var urlConsultarEstado = urlESB + config.urls.ESB.root + config.urls.ESB.Restaurante.consultarEstadoPedido;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'elopez>>> '
});

const arrMenu = {
    op0: ['Terminar Pedido', 0],
    op1: ['Gringas', 15],
    op2: ['Tacos', 10],
    op3: ['Quesadillas', 13],
    op4: ['Solicitar estado del pedido', 4],
};

const arrPedidos = new Array();
var ContadorPedidos = 0;
var NombreCliente = '';
var CodigoBuscado = '';

var lineaDivisoraInicio = '*************************************************************';
var lineaDivisoraFin    = '=============================================================';

app.listen(puerto, function() {
  console.log('*************************************************************');
  console.log('****************************CLIENTE**************************');
  console.log('*************************************************************');
  console.log('escuchando en ' + config.urls.root+puerto);
  //console.log(urlRegistrarPedido);
  //console.log(urlConsultarEstado);
  iniciarServer();
});

function iniciarServer(){
    MostrarMenu();
    var objPedido = new Array();
    var blnPedidoFinalizado = false;
    var blnPedidoNombre = false;
    var blnPedidoCodigoRestaurante = false;
    rl.prompt();

    rl.on('line', (line) => {
        if(/^\d+$/.test(line.trim())){ //Si es un numero
            var Seleccion = Number(line.trim());
            if(Seleccion >= 1 && Seleccion <= 3){
                objPedido.push(arrMenu['op' + Seleccion]);
                console.log(lineaDivisoraInicio);
                console.log('Pedido al momento:');
                console.log(objPedido);
                var total = 0;
                objPedido.forEach((opcion)=>{total += opcion[1];});
                console.log('Total: '+ total);

                MostrarMenu();
            }else if(Seleccion == 0){ //Terminar el pedido
                console.log('Terminar pedido (S/N):');
                blnPedidoFinalizado = true;
            }else if(Seleccion == 4){
                console.log('Ingrese el codigo de su pedido:');
                blnPedidoCodigoRestaurante = true;
            }else{
                console.log('Opcion fuera de rango');
            }
            rl.prompt();
        }else{
            if(blnPedidoFinalizado){
                if(line.trim().toUpperCase() =='S'){
                    console.log('Ingrese su nombre');
                    blnPedidoNombre = true;
                }else{
                    MostrarMenu();
                }
                blnPedidoFinalizado = false;
            }else if(blnPedidoNombre){
                NombreCliente = line.trim().toUpperCase();
                ContadorPedidos++;
                var item = {
                    idPedido: ContadorPedidos,
                    cliente: NombreCliente,
                    pedido:  objPedido,
                    estado: 1 //pendiente
                };
                
                arrPedidos.push(item);
                blnPedidoNombre = false;
                console.log(lineaDivisoraFin);

                //axios.post('http://localhost:3011/Restaurante/RegistrarPedido', { item })
                axios.post(urlRegistrarPedido, { item })
                .then(res => {
                    console.log('Su pedido fue registrado correctamente');
                    console.log('El id de su pedido es: CD' + ContadorPedidos);
                    objPedido = new Array();
                    rl.prompt();
                });
                
                console.log(lineaDivisoraFin);
                MostrarMenu();
            }else if(blnPedidoCodigoRestaurante){
                CodigoBuscado = line.trim().toUpperCase();
                console.log('   Buscando pedido con codigo ' + CodigoBuscado);
                var item = { idPedido : CodigoBuscado.replace('CD','')};

                axios.post(urlConsultarEstado, { item })
                .then(res => {
                    console.log(res.data);
                    rl.prompt();
                });
                MostrarMenu();
            }else{
                console.log('Vuelva a intentarlo');
            }
            rl.prompt();
        }        
    });
}

function MostrarMenu(){
    console.log("Menu:");
    console.log('   0. Terminar pedido');
    console.log('   1. Gringas     Q15.00');
    console.log('   2. Tacos       Q10.00');
    console.log('   3. Quesadillas Q13.00');
    console.log('   4. Solicitar estado del pedido');
    console.log(lineaDivisoraFin);
}



