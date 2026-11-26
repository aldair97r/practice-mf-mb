import { inject, Service } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { CrearPedido, Pedido } from './pedido';
import { Producto } from './producto';

@Service()
export class PedidosApi {
  private readonly http = inject(HttpClient);
  private readonly urlPedidos = 'http://localhost:3002/pedidos';
  private readonly urlProductos = 'http://localhost:3001/productos';

  obtenerPedidos() {
    return httpResource<Pedido[]>(() => this.urlPedidos, { defaultValue: [] });
  }

  obtenerProductos() {
    return httpResource<Producto[]>(() => this.urlProductos, { defaultValue: [] });
  }

  crear(datos: CrearPedido) {
    return this.http.post<Pedido>(this.urlPedidos, datos);
  }
}
