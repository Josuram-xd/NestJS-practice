import { Controller, Get, Param, Post, Body, Delete} from '@nestjs/common';

interface Pedido {
    id: string;
    producto: string;
    cantidad: number;
    tipoPago: 'credito' | 'debito' | 'efectivo' | 'Transferencia';
}

@Controller('pedidos')
export class PedidosController {
    private pedidos: Pedido[] = [];

    @Get()
    getPedidos() {
        return this.pedidos;
    }

    @Get(':id')
    getPedido(@Param('id') id: string) {
        console.log('Buscando pedido con id: ' + id);
        const data = this.pedidos.find(pedido => pedido.id === id);
        if (!data) {
            console.log('Pedido no encontrado');
            return { message: 'Pedido no encontrado' };
        }
        console.log('Pedido encontrado: ', data);
        return data;
    }

    @Get('pago/:tipoPago')
    getPedidosPorTipoPago(@Param('tipoPago') tipoPago: 'credito' | 'debito' | 'efectivo' | 'Transferencia') {
        console.log(`Buscando pedidos con tipo de pago: ${tipoPago}`);
        const data = this.pedidos.filter(pedido => pedido.tipoPago === tipoPago);
        if (data.length === 0) {
            console.log(`No se encontraron pedidos con tipo de pago: ${tipoPago}`);
            return { message: `No se encontraron pedidos con tipo de pago: ${tipoPago}` };
        }
        console.log('Pedidos encontrados: ', data);
        return data;
    }

    @Post('ordencompra')
    createPedidoOrdenCompra(@Body() pedido: Pedido) {
        console.log('Creando pedido: ', pedido);
        this.pedidos.push(pedido);
        return { message: 'Pedido creado exitosamente', pedido };
    }

    @Delete(':id')
    deletePedidoOrdenCompra(@Param('id') id: string) {
        console.log('Eliminando pedido con id: ' + id);
        const index = this.pedidos.findIndex(pedido => pedido.id === id);
        if (index === -1) {
            console.log('Pedido no encontrado');
            return { message: 'Pedido no encontrado' };
        }
        this.pedidos.splice(index, 1);
        console.log('Pedido eliminado exitosamente');
        return { message: 'Pedido eliminado exitosamente' };
    }

    

}