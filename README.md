# PRACTICA #4
## Orquestación de servicios
Descripcion: Existen tres servicios disponibles que se comunican mediante un ESB, los servicios y sus funciones son los siguientes
  - Cliente:
    - Solicitar pedido al restaurante
    - Verificar estado del pedido al restaurante
    - Verificar estado del pedido al repartidor 
  - Restaurante
    - Recibir pedido del cliente
    - Informar estado del pedido al cliente
    - Avisar al repartidor que ya está listo el pedido
  - Repartidores
    - Recibir pedido del restaurante
    - Informar estado del pedido al cliente
    - Marcar como entregado
    
## Instalacion

Es necesario tener instalado [Node.js](https://nodejs.org/) v4+ para ejecutar.
Clonar el repositorio
```sh
$ git clone https://github.com/EstuardoLopez/sa_practica3.git
$ cd sa_practica3
```
Instalar las dependecias 
```sh
$ npm install
```
Correr cada servidor por aparte
```sh
$ node servers/Cliente.js
$ node servers/Restaurante.js
$ node servers/Repartidor.js
```
## Código ESB

Se creo un nuevo servicio que funciona como intermediario para comunicar a los servicios cliente,restaurante,repartidor. 

### Configuración ESB

El ESB se apoya de un archivo de configuracion para estandarizar todas las rutas. 
```node
module.exports  = {
    urls : {
        root: 'http://localhost:',
        ESB: {
            puerto: '3013',
            root: '/esb',
            Restaurante: {
                registrarPedido: '/RestauranteRegistrarPedido',
                registrarEntrega: '/RestauranteConsultarEstado',
                consultarEstadoPedido: '/RestauranteRegistrarEntrega',
            },
            Repartidor: {
                registrarPedido: '/RepartidorRegistrarPedido',
                consultarEstado: '/RepartidorConsultarEstado',
            }
        },
        Cliente: {
            puerto: '3010'
        },
        Restaurante: {
            root: '/Restaurante',
            puerto: '3011',
            registrarPedido: '/RegistrarPedido',
            registrarEntrega: '/RegistrarEntrega',
            consultarEstadoPedido: '/ConsultarEstado',
        },
        Repartidor: {
            root: '/Repartidor',
            puerto: '3012',
            registrarPedido: '/RegistrarPedido',
            consultarEstado: '/ConsultarEstado',
        }
    }
}
```
Ahora en el archivo routes/ESB.sjs se estable la comunicación de ESB con los demas servicios. 
``` node

//El router recibe la url definida en el archivo de configuración
router.post(config.urls.ESB.Restaurante.registrarPedido, function (req, res) {
    //Construimos la url del servicio del restaurante
    var url =  config.urls.root + config.urls.Restaurante.puerto + config.urls.Restaurante.root + config.urls.Restaurante.registrarPedido;
    //Recuperamos la información que recibimos para poder enviarla al servicio de restaurante
    var item = req.body.item;
    //Mandamos imprimir para usarlo como log
    print('Cliente','Registrar pedido en restaurante');
    //Enviamos los datos recibidos a servicio de restaurante
    axios.post(url, { item })
    .then(res_ => {
        //Respondemos con el resultado que nos devolvio el servicio de restaurante
        res.send(res_.data);
    });
});
```

