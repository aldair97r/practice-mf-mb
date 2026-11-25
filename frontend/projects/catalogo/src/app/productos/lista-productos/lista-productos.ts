import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Productos } from '../productos';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-lista-productos',
  styleUrl: './lista-productos.css',
  templateUrl: './lista-productos.html',
})
export class ListaProductos {
  private readonly productos = inject(Productos);

  protected readonly lista = this.productos.obtenerTodos();
}
