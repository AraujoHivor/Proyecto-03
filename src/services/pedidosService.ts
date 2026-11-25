import { get, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import type { Pedido, PedidoFirebase } from "../types/DashboardTypes";

export async function obtenerPedidos(ruta: string = "/"): Promise<Pedido[]> {
  const referencia = ref(database, ruta);
  const snapshot = await get(referencia);

  if (snapshot.exists()) {
    const rawData = snapshot.val();
    const listaCruda: PedidoFirebase[] = Array.isArray(rawData)
      ? rawData
      : Object.values(rawData);

    return listaCruda
      .filter((item) => item != null)
      .map((item, index) => ({
        ...item,
        id: index + 1,
        sales: Number(item.sales) || 0,
        profit: Number(item.profit) || 0,
        quantity: Number(item.quantity) || 0,
        year: Number(item.year) || 0,
      }));
  }

  return [];
}