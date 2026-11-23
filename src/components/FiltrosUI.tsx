import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface FiltrosProps {
  anioSeleccionado: string;
  regionSeleccionada: string;
  anios: number[];
  regiones: string[];
  onAnioChange: (valor: string) => void;
  onRegionChange: (valor: string) => void;
  onRestablecer: () => void;
}

export default function FiltrosUI({
  anioSeleccionado,
  regionSeleccionada,
  anios,
  regiones,
  onAnioChange,
  onRegionChange,
  onRestablecer,
}: FiltrosProps) {
  const handleAnioChange = (event: SelectChangeEvent<string>) => {
    onAnioChange(event.target.value);
  };

  const handleRegionChange = (event: SelectChangeEvent<string>) => {
    onRegionChange(event.target.value);
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.03)",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Grid container spacing={2.5} sx={{ alignItems: "center" }}>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              borderRight: { xs: "none", md: "1px solid #e2e8f0" },
              pr: { md: 2 },
            }}
          >
            <div
              style={{
                backgroundColor: "#eff6ff",
                borderRadius: "10px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FilterListIcon sx={{ color: "#2563eb", fontSize: 20 }} />
            </div>
            <div>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0f172a" }}>
                Filtros
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
                Personaliza la vista de los datos
              </Typography>
            </div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", display: "block", mb: 0.5 }}>
              Año
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={anioSeleccionado}
                onChange={handleAnioChange}
                sx={{ borderRadius: 2, bgcolor: "#fff" }}
              >
                <MenuItem value="Todos">Todos</MenuItem>
                {anios.map((anio) => (
                  <MenuItem key={anio} value={String(anio)}>
                    {anio}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: "#334155", display: "block", mb: 0.5 }}>
              Región
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={regionSeleccionada}
                onChange={handleRegionChange}
                sx={{ borderRadius: 2, bgcolor: "#fff" }}
              >
                <MenuItem value="Todas">Todas</MenuItem>
                {regiones.map((reg) => (
                  <MenuItem key={reg} value={reg}>
                    {reg}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "stretch", md: "flex-end" },
              alignSelf: { md: "flex-end" },
            }}
          >
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={onRestablecer}
              sx={{
                width: { xs: "100%", md: "auto" },
                textTransform: "none",
                borderRadius: 2,
                borderColor: "#e2e8f0",
                color: "#64748b",
                px: 2.5,
                py: 0.85,
                "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
              }}
            >
              Restablecer
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}