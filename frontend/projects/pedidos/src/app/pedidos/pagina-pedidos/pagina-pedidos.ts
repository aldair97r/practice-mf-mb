import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { PedidosApi } from '../pedidos-api';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-pagina-pedidos',
  styleUrl: './pagina-pedidos.css',
  templateUrl: './pagina-pedidos.html',
})
export class PaginaPedidos {
  private readonly api = inject(PedidosApi);

  protected readonly productos = this.api.obtenerProductos();
  protected readonly pedidos = this.api.obtenerPedidos();

  protected readonly productoId = signal<number | null>(null);
  protected readonly cantidad = signal(1);
  protected readonly enviando = signal(false);
  protected readonly mensajeError = signal('');

  // Combina datos de los dos microservicios:
  // el pedido trae productoId y el nombre lo conoce Productos.
  protected readonly filas = computed(() => {
    const productos = this.productos.value();

    return this.pedidos.value().map((pedido) => ({
      ...pedido,
      nombre:
        productos.find((p) => p.id === pedido.productoId)?.nombre ??
        'Producto #' + pedido.productoId,
    }));
  });

  protected crear() {
    const productoId = this.productoId();
    if (productoId === null || this.cantidad() < 1) {
      return;
    }

    this.enviando.set(true);
    this.mensajeError.set('');

    this.api.crear({ productoId, cantidad: this.cantidad() }).subscribe({
      next: () => {
        this.enviando.set(false);
        this.pedidos.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.enviando.set(false);
        this.mensajeError.set(this.describirError(error));
      },
    });
  }

  private describirError(error: HttpErrorResponse) {
    switch (error.status) {
      case 0:
        return 'El servicio de pedidos no responde.';
      case 404:
        return 'Ese producto ya no existe.';
      case 503:
        return 'Pedidos no pudo consultar el servicio de productos.';
      default:
        return 'No se pudo crear el pedido.';
    }
  }
}
