export interface PedidoFirebase {
  order_id: string;
  order_date: string;
  ship_date: string;
  ship_mode: string;
  customer_name: string;
  segment: string;
  state: string;
  country: string;
  market: string;
  region: string;
  product_id: string;
  category: string;
  sub_category: string;
  product_name: string;
  sales: number;
  quantity: number;
  discount: number;
  profit: number;
  shipping_cost: number;
  order_priority: string;
  year: number;
}

export interface Pedido extends PedidoFirebase {
  id: number;
}

export interface VentaAnual {
  anio: number;
  ventas: number;
}

export interface GananciaCategoria {
  categoria: string;
  ganancia: number;
}

export interface VentaRegion {
  region: string;
  ventas: number;
}