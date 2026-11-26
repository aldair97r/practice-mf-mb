import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ResumenApi } from '../resumen-api';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-panel-resumen',
  styleUrl: './panel-resumen.css',
  templateUrl: './panel-resumen.html',
})
export class PanelResumen {
  private readonly api = inject(ResumenApi);

  protected readonly productos = this.api.obtenerProductos();
  protected readonly pedidos = this.api.obtenerPedidos();

  protected readonly unidades = computed(() =>
    this.pedidos.value().reduce((suma, p) => suma + p.cantidad, 0),
  );

  protected readonly totalVendido = computed(() =>
    this.pedidos.value().reduce((suma, p) => suma + p.total, 0),
  );

  protected recargar() {
    this.productos.reload();
    this.pedidos.reload();
  }
}
