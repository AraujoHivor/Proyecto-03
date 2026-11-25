import { useState, useMemo } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import EncabezadoUI from "./components/EncabezadoUI";
import FiltrosUI from "./components/FiltrosUI";
import IndicadorUI from "./components/IndicadorUI";
import GraficoVentasUI from "./components/GraficoVentasUI";
import GraficoCategoriasUI from "./components/GraficoCategoriasUI";
import GraficoRegionesUI from "./components/GraficoRegionesUI";
import TablaPedidosUI from "./components/TablaPedidosUI";

import useFetchData from "./hooks/useFetchData";
import type {
  VentaAnual,
  GananciaCategoria,
  VentaRegion,
} from "./types/DashboardTypes";

export default function App() {
  // Estados de los filtros (useState)
  const [anioSeleccionado, setAnioSeleccionado] = useState<string>("Todos");
  const [regionSeleccionada, setRegionSeleccionada] = useState<string>("Todas");

  // Consulta asíncrona a Firebase Realtime Database (useEffect + useState)
  const { data: pedidos, loading, error } = useFetchData();

  const handleRestablecer = () => {
    setAnioSeleccionado("Todos");
    setRegionSeleccionada("Todas");
  };

  // Listas dinámicas de años y regiones presentes en Firebase
  const aniosDisponibles = useMemo(() => {
    const unicos = Array.from(new Set(pedidos.map((p) => p.year)));
    return unicos.sort((a, b) => a - b);
  }, [pedidos]);

  const regionesDisponibles = useMemo(() => {
    const unicas = Array.from(new Set(pedidos.map((p) => p.region)));
    return unicas.sort();
  }, [pedidos]);

  // Filtrado de los 51.290 registros según la selección del usuario
  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter((p) => {
      const coincideAnio =
        anioSeleccionado === "Todos" || String(p.year) === anioSeleccionado;
      const coincideRegion =
        regionSeleccionada === "Todas" || p.region === regionSeleccionada;
      return coincideAnio && coincideRegion;
    });
  }, [pedidos, anioSeleccionado, regionSeleccionada]);

  // Cálculo de indicadores KPI
  const ventasTotales = useMemo(
    () => pedidosFiltrados.reduce((acc, p) => acc + p.sales, 0),
    [pedidosFiltrados]
  );

  const gananciaTotal = useMemo(
    () => pedidosFiltrados.reduce((acc, p) => acc + p.profit, 0),
    [pedidosFiltrados]
  );

  const unidadesVendidas = useMemo(
    () => pedidosFiltrados.reduce((acc, p) => acc + p.quantity, 0),
    [pedidosFiltrados]
  );

  // Agrupación por año (respeta el filtro de región)
  const datosVentasAnuales: VentaAnual[] = useMemo(() => {
    const baseRegion =
      regionSeleccionada === "Todas"
        ? pedidos
        : pedidos.filter((p) => p.region === regionSeleccionada);

    const mapa = new Map<number, number>();
    baseRegion.forEach((p) => {
      mapa.set(p.year, (mapa.get(p.year) || 0) + p.sales);
    });

    const resultado = Array.from(mapa.entries())
      .map(([anio, ventas]) => ({ anio, ventas }))
      .sort((a, b) => a.anio - b.anio);

    return anioSeleccionado === "Todos"
      ? resultado
      : resultado.filter((d) => String(d.anio) === anioSeleccionado);
  }, [pedidos, anioSeleccionado, regionSeleccionada]);

  // Agrupación de ganancias por categoría
  const datosCategorias: GananciaCategoria[] = useMemo(() => {
    const mapa = new Map<string, number>();
    pedidosFiltrados.forEach((p) => {
      mapa.set(p.category, (mapa.get(p.category) || 0) + p.profit);
    });

    return Array.from(mapa.entries())
      .map(([categoria, ganancia]) => ({ categoria, ganancia }))
      .sort((a, b) => b.ganancia - a.ganancia);
  }, [pedidosFiltrados]);

  // Top 5 regiones por ventas
  const datosRegiones: VentaRegion[] = useMemo(() => {
    const mapa = new Map<string, number>();
    pedidosFiltrados.forEach((p) => {
      mapa.set(p.region, (mapa.get(p.region) || 0) + p.sales);
    });

    return Array.from(mapa.entries())
      .map(([region, ventas]) => ({ region, ventas }))
      .sort((a, b) => b.ventas - a.ventas)
      .slice(0, 5);
  }, [pedidosFiltrados]);

  return (
    <div style={{ backgroundColor: "#f5f7fa", minHeight: "100vh", paddingBottom: "40px", width: "100%" }}>
      <CssBaseline />

      <EncabezadoUI
        titulo="SuperStore | Dashboard de Ventas"
        subtitulo="Análisis histórico de ventas 2011–2014"
        totalRegistros={pedidosFiltrados.length}
      />

      <Container maxWidth={false} sx={{ mt: 3.5, px: { xs: 2, sm: 4, md: 6 } }}>
        {/* Estado de carga */}
        {loading && (
          <Grid container sx={{ justifyContent: "center", alignItems: "center", py: 8, gap: 2 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ color: "#475569", fontWeight: 500 }}>
              Cargando registros desde Firebase Realtime Database...
            </Typography>
          </Grid>
        )}

        {/* Estado de error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            No se pudieron recuperar los datos de Firebase: {error}
          </Alert>
        )}

        {/* Dashboard con datos recuperados */}
        {!loading && !error && (
          <>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <FiltrosUI
                  anioSeleccionado={anioSeleccionado}
                  regionSeleccionada={regionSeleccionada}
                  anios={aniosDisponibles}
                  regiones={regionesDisponibles}
                  onAnioChange={setAnioSeleccionado}
                  onRegionChange={setRegionSeleccionada}
                  onRestablecer={handleRestablecer}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <IndicadorUI
                  titulo="Ventas totales"
                  valor={ventasTotales}
                  subtitulo="Valor acumulado"
                  icono={<BarChartIcon sx={{ color: "#2563eb" }} />}
                  colorFondoIcono="#eff6ff"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <IndicadorUI
                  titulo="Ganancia total"
                  valor={gananciaTotal}
                  subtitulo="Resultado neto"
                  esDecimal
                  icono={<TrendingUpIcon sx={{ color: "#16a34a" }} />}
                  colorFondoIcono="#ecfdf5"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <IndicadorUI
                  titulo="Unidades vendidas"
                  valor={unidadesVendidas}
                  subtitulo="Volumen total"
                  icono={<ShoppingBagIcon sx={{ color: "#7c3aed" }} />}
                  colorFondoIcono="#f3e8ff"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <GraficoVentasUI datos={datosVentasAnuales} />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <GraficoCategoriasUI datos={datosCategorias} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <GraficoRegionesUI datos={datosRegiones} />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TablaPedidosUI pedidos={pedidosFiltrados} />
              </Grid>
            </Grid>

            <Grid container sx={{ justifyContent: "space-between", mt: 3, px: 0.5 }}>
              <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                Fuente: Firebase Realtime Database (SuperStore_Orders.json)
              </Typography>
              <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                Período 2011–2014 · {pedidos.length.toLocaleString("es-EC")} registros
              </Typography>
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
}