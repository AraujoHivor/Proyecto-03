import type { ReactNode } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface IndicadorProps {
  titulo: string;
  valor: number;
  subtitulo: string;
  esDecimal?: boolean;
  icono: ReactNode;
  colorFondoIcono: string;
}

export default function IndicadorUI({
  titulo,
  valor,
  subtitulo,
  esDecimal = false,
  icono,
  colorFondoIcono,
}: IndicadorProps) {
  const valorFormateado = valor.toLocaleString("es-EC", {
    minimumFractionDigits: esDecimal ? 2 : 0,
    maximumFractionDigits: esDecimal ? 2 : 0,
  });

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
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2.5, p: 3 }}>
        <div
          style={{
            backgroundColor: colorFondoIcono,
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icono}
        </div>
        <div>
          <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
            {titulo}
          </Typography>
          <Typography
            variant="h4"
            component="p"
            sx={{ fontWeight: 800, my: 0.4, color: "#0f172a", letterSpacing: "-0.5px" }}
          >
            {valorFormateado}
          </Typography>
          <Typography variant="caption" sx={{ color: "#94a3b8" }}>
            {subtitulo}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}