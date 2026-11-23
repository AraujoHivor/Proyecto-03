import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BarChartIcon from "@mui/icons-material/BarChart";

interface EncabezadoProps {
  titulo: string;
  subtitulo: string;
  totalRegistros: number;
}

export default function EncabezadoUI({
  titulo,
  subtitulo,
  totalRegistros,
}: EncabezadoProps) {
  const partesTitulo = titulo.split("|");

  return (
    <header
      style={{
        backgroundColor: "#17355e",
        color: "white",
        padding: "22px 0",
        width: "100%",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
        <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Grid size={{ xs: 12, md: 8 }} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: "12px",
                width: "46px",
                height: "46px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <BarChartIcon sx={{ color: "#93c5fd" }} />
            </div>

            <div>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {partesTitulo.length > 1 ? (
                  <>
                    {partesTitulo[0].trim()}{" "}
                    <span style={{ color: "#4a729e", fontWeight: 400, margin: "0 4px" }}>|</span>{" "}
                    {partesTitulo[1].trim()}
                  </>
                ) : (
                  titulo
                )}
              </Typography>
              <Typography variant="body2" sx={{ color: "#9fb3c8", mt: 0.4 }}>
                {subtitulo}
              </Typography>
            </div>
          </Grid>

          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: "999px",
                padding: "6px 16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.82rem",
                color: "#e2e8f0",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  display: "inline-block",
                }}
              />
              {totalRegistros.toLocaleString("es-EC")} registros analizados
            </div>
          </Grid>
        </Grid>
      </Container>
    </header>
  );
}