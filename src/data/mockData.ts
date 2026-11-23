import type {
  VentaAnual,
  GananciaCategoria,
  VentaRegion,
} from "../types/DashboardTypes";

export const ANIOS_DISPONIBLES: number[] = [2011, 2012, 2013, 2014];

export const REGIONES_DISPONIBLES: string[] = [
  "Africa",
  "Canada",
  "Caribbean",
  "Central",
  "Central Asia",
  "EMEA",
  "East",
  "North",
  "North Asia",
  "Oceania",
  "South",
  "Southeast Asia",
  "West",
];

export const TOTALES_GLOBALES = {
  ventas: 12642905,
  ganancia: 1469034.82,
  unidades: 178312,
  registros: 51290,
};

export const VENTAS_POR_ANIO_INICIAL: VentaAnual[] = [
  { anio: 2011, ventas: 2259451 },
  { anio: 2012, ventas: 2677439 },
  { anio: 2013, ventas: 3405746 },
  { anio: 2014, ventas: 4300269 },
];

export const GANANCIAS_CATEGORIA_INICIAL: GananciaCategoria[] = [
  { categoria: "Technology", ganancia: 663779 },
  { categoria: "Office Supplies", ganancia: 518474 },
  { categoria: "Furniture", ganancia: 286782 },
];

export const VENTAS_REGION_INICIAL: VentaRegion[] = [
  { region: "Central", ventas: 2822399 },
  { region: "South", ventas: 1600960 },
  { region: "North", ventas: 1248192 },
  { region: "Oceania", ventas: 1100207 },
  { region: "Southeast Asia", ventas: 884438 },
];

export { PEDIDOS_MUESTRA } from "./pedidosMuestra";