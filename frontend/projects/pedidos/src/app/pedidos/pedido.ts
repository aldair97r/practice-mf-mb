export interface Pedido {
  id: number;
  productoId: number;
  cantidad: number;
  total: number;
}

export interface CrearPedido {
  productoId: number;
  cantidad: number;
}
