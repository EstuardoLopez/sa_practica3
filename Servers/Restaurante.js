const express = require('express');
const readline = require('readline');
var restauranteRouter = require('../Routes/Restaurante');
var Pedidos =  require('../Constantes/Pedidos');
const axios = require('axios');
var config = require('../Constantes/config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/Restaurante', restauranteRouter);
//var puerto = '3011';
var puerto = config.urls.Restaurante.puerto;
var urlESB = config.urls.root + config.urls.ESB.puerto;
var urlRegistrarPedido = urlESB + config.urls.ESB.root + config.urls.ESB.Repartidor.registrarPedido;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'elopez>>> '
});

app.listen(puerto, function() {
  console.log('*************************************************************');
  console.log('**************************RESTAURANTE************************');
  console.log('*************************************************************');
  console.log('escuchando en ' + config.urls.root+puerto);
  //console.log(urlRegistrarPedido);
  iniciarServer();
});

function iniciarServer(){
    MostrarMenu();
    var blnPedidoCodigo = false;
    rl.prompt();

    rl.on('line', (line) => {
        if(/^\d+$/.test(line.trim())){ //Si es un numero
            var Seleccion = Number(line.trim());
            MostrarMenu();
            if(Seleccion == 1){
                console.log('pedidos registrados: ', Pedidos.recibidos);
            }else if(Seleccion == 2){
                console.log('Ingrese el codigo de su pedido:');
                blnPedidoCodigo = true;
            }else{
                console.log('Opcion fuera de rango');
            }
            
            rl.prompt();
        }else{
            if(blnPedidoCodigo){
                var itemEncontrado = null;
                var indexItem = 0;
                var contador = 0;
                var codigoBuscado = line.trim().toUpperCase().replace('CD','');
                Pedidos.recibidos.forEach(itemPedido => {
                    
                    if(itemPedido.idPedido == codigoBuscado){
                        itemEncontrado = itemPedido;
                        indexItem = contador;
                    }
                    contador++;
                });

                if(itemEncontrado == null){
                    console.error('No se encontro el peidido indicado');
                }else{
                    //Enviar a repartidor
                    var item = itemEncontrado;
                    //axios.post('http://localhost:3012/Repartidor/RegistrarPedido', { item })
                    axios.post(urlRegistrarPedido, { item })
                    .then(res => {
                        console.log('Pedido despachado correctamente');
                        Pedidos.recibidos[indexItem].estado = 2;
                        rl.prompt();
                    });
                }
                blnPedidoCodigo = false;
            }else{
                console.log('Vuelva a intentarlo');
            }            
            rl.prompt();
        }        
    });
}



function MostrarMenu(){
    console.log("Menu:");
    console.log('   1. Ver pedidos registrados');
    console.log('   2. Despachar pedido');
    console.log('=============================================================');
}


