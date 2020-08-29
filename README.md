# PRACTICA #3
## Coreografía de servicios
Descripcion: Existen tres servicios que se comunican entre si, los servicios y sus funciones son los siguientes
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

