export interface Pedido {
  id: number; 
  order_date: string;
  year: number;
  category: string;
  sub_category: string;
  region: string;
  sales: number;
  profit: number;
  quantity: number;
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