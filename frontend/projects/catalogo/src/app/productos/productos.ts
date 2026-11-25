import { Service } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Producto } from './producto';

@Service()
export class Productos {
  private readonly url = 'http://localhost:3001/productos';

  obtenerTodos() {
    return httpResource<Producto[]>(() => this.url, { defaultValue: [] });
  }
}
