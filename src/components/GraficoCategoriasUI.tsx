import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { BarChart } from "@mui/x-charts/BarChart";
import type { GananciaCategoria } from "../types/DashboardTypes";

interface GraficoCategoriasProps {
  datos: GananciaCategoria[];
}

export default function GraficoCategoriasUI({ datos }: GraficoCategoriasProps) {
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const traducirCategoria = (cat: string) => {
    if (cat === "Technology") return "Tecnología";
    if (cat === "Office Supplies") return "Suministros";
    if (cat === "Furniture") return "Mobiliario";
    return cat;
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.03)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a" }}>
              Ganancias por categoría
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Rendimiento neto por tipo de producto
            </Typography>
          </div>

          <Tooltip title="Ver detalle del indicador">
            <IconButton
              size="small"
              onClick={() => setMostrarInfo(!mostrarInfo)}
              aria-label="Información sobre ganancias por categoría"
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
            Compara la ganancia neta total (Profit) obtenida por cada línea de productos: Tecnología, Suministros de oficina y Mobiliario.
          </Alert>
        )}

        {/* Etiquetas superiores alineadas exactamente sobre el área de barras */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingLeft: "48px",
            paddingRight: "48px",
            marginBottom: "-8px",
          }}
        >
          {datos.map((item) => (
            <Typography
              key={item.categoria}
              variant="caption"
              sx={{ fontWeight: 700, color: "#334155", textAlign: "center", flex: 1 }}
            >
              {(item.ganancia / 1000).toFixed(1).replace(".", ",")} mil
            </Typography>
          ))}
        </div>

        <BarChart
          height={235}
          margin={{ top: 18, right: 48, bottom: 30, left: 4 }}
          grid={{ horizontal: true }}
          borderRadius={6}
          series={[
            {
              data: datos.map((d) => d.ganancia),
              color: "#3b82f6",
            },
          ]}
          xAxis={[
            {
              scaleType: "band",
              data: datos.map((d) => traducirCategoria(d.categoria)),
              categoryGapRatio: 0.58,
            },
          ]}
          yAxis={[
            {
              min: 0,
              tickNumber: 5,
            },
          ]}
          sx={{
            "& .MuiChartsLegend-root": {
              display: "none",
            },
            "& .MuiChartsAxis-directionY": {
              display: "none",
            },
            "& .MuiChartsAxis-directionX .MuiChartsAxis-line": {
              stroke: "#e2e8f0",
            },
            "& .MuiChartsAxis-directionX .MuiChartsAxis-tick": {
              display: "none",
            },
            "& .MuiChartsAxis-tickLabel": {
              fill: "#475569",
              fontSize: "0.75rem",
              fontWeight: 500,
            },
            "& .MuiChartsGrid-line": {
              stroke: "#f1f5f9",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}