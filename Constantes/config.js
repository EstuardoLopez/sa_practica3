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