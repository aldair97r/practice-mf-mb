import { Service } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Pedido } from './pedido';
import { Producto } from './producto';

@Service()
export class ResumenApi {
  private readonly urlPedidos = 'http://localhost:3002/pedidos';
  private readonly urlProductos = 'http://localhost:3001/productos';

  obtenerPedidos() {
    return httpResource<Pedido[]>(() => this.urlPedidos, { defaultValue: [] });
  }

  obtenerProductos() {
    return httpResource<Producto[]>(() => this.urlProductos, { defaultValue: [] });
  }
}
