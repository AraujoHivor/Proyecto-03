import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
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

import {
  ANIOS_DISPONIBLES,
  REGIONES_DISPONIBLES,
  TOTALES_GLOBALES,
  VENTAS_POR_ANIO_INICIAL,
  GANANCIAS_CATEGORIA_INICIAL,
  VENTAS_REGION_INICIAL,
  PEDIDOS_MUESTRA,
} from "./data/mockData";

export default function App() {
  const [anioSeleccionado, setAnioSeleccionado] = useState<string>("Todos");
  const [regionSeleccionada, setRegionSeleccionada] = useState<string>("Todas");

  const handleRestablecer = () => {
    setAnioSeleccionado("Todos");
    setRegionSeleccionada("Todas");
  };

  const pedidosFiltrados = PEDIDOS_MUESTRA.filter((p) => {
    const coincideAnio = anioSeleccionado === "Todos" || String(p.year) === anioSeleccionado;
    const coincideRegion = regionSeleccionada === "Todas" || p.region === regionSeleccionada;
    return coincideAnio && coincideRegion;
  });

  const sinFiltros = anioSeleccionado === "Todos" && regionSeleccionada === "Todas";

  const ventasTotales = sinFiltros
    ? TOTALES_GLOBALES.ventas
    : pedidosFiltrados.reduce((acc, p) => acc + p.sales, 0);

  const gananciaTotal = sinFiltros
    ? TOTALES_GLOBALES.ganancia
    : pedidosFiltrados.reduce((acc, p) => acc + p.profit, 0);

  const unidadesVendidas = sinFiltros
    ? TOTALES_GLOBALES.unidades
    : pedidosFiltrados.reduce((acc, p) => acc + p.quantity, 0);

  const datosVentasAnuales =
    anioSeleccionado === "Todos"
      ? VENTAS_POR_ANIO_INICIAL
      : VENTAS_POR_ANIO_INICIAL.filter((d) => String(d.anio) === anioSeleccionado);

  return (
    <div style={{ backgroundColor: "#f5f7fa", minHeight: "100vh", paddingBottom: "40px", width: "100%" }}>
      <CssBaseline />

      <EncabezadoUI
        titulo="SuperStore | Dashboard de Ventas"
        subtitulo="Análisis histórico de ventas 2011–2014"
        totalRegistros={sinFiltros ? TOTALES_GLOBALES.registros : pedidosFiltrados.length}
      />

      <Container maxWidth={false} sx={{ mt: 3.5, px: { xs: 2, sm: 4, md: 6 } }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <FiltrosUI
              anioSeleccionado={anioSeleccionado}
              regionSeleccionada={regionSeleccionada}
              anios={ANIOS_DISPONIBLES}
              regiones={REGIONES_DISPONIBLES}
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
            <GraficoCategoriasUI datos={GANANCIAS_CATEGORIA_INICIAL} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <GraficoRegionesUI datos={VENTAS_REGION_INICIAL} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TablaPedidosUI pedidos={pedidosFiltrados} />
          </Grid>
        </Grid>

        <Grid container sx={{ justifyContent: "space-between", mt: 3, px: 0.5 }}>
          <Typography variant="caption" sx={{ color: "#94a3b8" }}>
            Fuente: SuperStore_Orders.csv
          </Typography>
          <Typography variant="caption" sx={{ color: "#94a3b8" }}>
            Período 2011–2014 · 51.290 registros
          </Typography>
        </Grid>
      </Container>
    </div>
  );
}