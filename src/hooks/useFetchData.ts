import { useEffect, useState } from "react";
import { obtenerPedidos } from "../services/pedidosService";
import type { Pedido } from "../types/DashboardTypes";

interface FetchDataResult {
  data: Pedido[];
  loading: boolean;
  error: string | null;
}

export default function useFetchData(): FetchDataResult {
  const [data, setData] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        setLoading(true);
        setError(null);
        const registros = await obtenerPedidos("/");
        setData(registros);
      } catch (err) {
        const mensaje =
          err instanceof Error
            ? err.message
            : "Error al conectar con Firebase Realtime Database.";
        setError(mensaje);
      } finally {
        setLoading(false);
      }
    }

    cargarDatos();
  }, []);

  return { data, loading, error };
}