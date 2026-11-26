import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { LineChart } from "@mui/x-charts/LineChart";
import type { VentaAnual } from "../types/DashboardTypes";

interface GraficoVentasProps {
  datos: VentaAnual[];
}

export default function GraficoVentasUI({ datos }: GraficoVentasProps) {
  const [mostrarInfo, setMostrarInfo] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.03)",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a" }}>
              Evolución de ventas por año
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Comportamiento histórico de las ventas
            </Typography>
          </div>

          <Tooltip title="Ver detalle del indicador">
            <IconButton
              size="small"
              onClick={() => setMostrarInfo(!mostrarInfo)}
              aria-label="Información sobre evolución de ventas"
              sx={{ color: mostrarInfo ? "#2563eb" : "#94a3b8" }}
            >
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>

        {mostrarInfo && (
          <Alert
            severity="info"
            onClose={() => setMostrarInfo(false)}
            sx={{ mb: 2, borderRadius: 2, fontSize: "0.8rem" }}
          >
            Muestra la evolución de los ingresos brutos acumulados (Sales) entre 2011 y 2014. Permite identificar el crecimiento interanual de la tienda.
          </Alert>
        )}

        <div style={{ maxWidth: "820px", margin: "0 auto", width: "100%" }}>
          <LineChart
            height={260}
            margin={{ top: 20, right: 24, bottom: 30, left: 42 }}
            grid={{ horizontal: true }}
            series={[
              {
                data: datos.map((d) => d.ventas),
                color: "#2563eb",
                area: true,
                showMark: true,
              },
            ]}
            xAxis={[
              {
                scaleType: "point",
                data: datos.map((d) => String(d.anio)),
              },
            ]}
            yAxis={[
              {
                min: 0,
                tickNumber: 5,
                valueFormatter: (valor: number) => {
                  if (valor === 0) return "0";
                  const millones = valor / 1000000;
                  return `${Number.isInteger(millones) ? millones : millones.toFixed(1).replace(".", ",")} M`;
                },
              },
            ]}
            sx={{
              "& .MuiChartsLegend-root": {
                display: "none",
              },
              "& .MuiAreaElement-root": {
                fill: "rgba(37, 99, 235, 0.15)",
              },
              "& .MuiLineElement-root": {
                strokeWidth: 3,
              },
              "& .MuiMarkElement-root": {
                fill: "#ffffff",
                stroke: "#2563eb",
                strokeWidth: 2.8,
              },
              "& .MuiChartsGrid-line": {
                stroke: "#e2e8f0",
                strokeDasharray: "4 4",
              },
              "& .MuiChartsAxis-line": {
                display: "none",
              },
              "& .MuiChartsAxis-directionY .MuiChartsAxis-tick": {
                display: "none",
              },
              "& .MuiChartsAxis-directionX .MuiChartsAxis-tick": {
                stroke: "#cbd5e1",
              },
              "& .MuiChartsAxis-tickLabel": {
                fill: "#94a3b8",
                fontSize: "0.75rem",
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}