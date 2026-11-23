import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { VentaRegion } from "../types/DashboardTypes";

interface GraficoRegionesProps {
  datos: VentaRegion[];
}

export default function GraficoRegionesUI({ datos }: GraficoRegionesProps) {
  const [mostrarInfo, setMostrarInfo] = useState(false);
  const maxVentas = Math.max(...datos.map((d) => d.ventas), 1);

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
        <Grid container sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: 2.5 }}>
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a" }}>
              Ventas por región
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Las 5 regiones con mayor volumen
            </Typography>
          </div>

          <Tooltip title="Ver detalle del indicador">
            <IconButton
              size="small"
              onClick={() => setMostrarInfo(!mostrarInfo)}
              aria-label="Información sobre ventas por región"
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
            sx={{ mb: 2.5, borderRadius: 2, fontSize: "0.8rem" }}
          >
            Presenta el ranking de las 5 regiones geográficas con mayor facturación acumulada dentro de las 13 regiones del dataset.
          </Alert>
        )}

        <Grid container spacing={2.4}>
          {datos.map((item) => (
            <Grid key={item.region} size={{ xs: 12 }}>
              <Grid container sx={{ justifyContent: "space-between", mb: 0.6 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: "#334155" }}>
                  {item.region}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#0f172a" }}>
                  {item.ventas.toLocaleString("es-EC")}
                </Typography>
              </Grid>
              <LinearProgress
                variant="determinate"
                value={(item.ventas / maxVentas) * 100}
                sx={{
                  height: 9,
                  borderRadius: 5,
                  bgcolor: "#f1f5f9",
                  "& .MuiLinearProgress-bar": { bgcolor: "#3b82f6", borderRadius: 5 },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}