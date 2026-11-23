import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Pedido } from "../types/DashboardTypes";

interface TablaPedidosProps {
  pedidos: Pedido[];
}

export default function TablaPedidosUI({ pedidos }: TablaPedidosProps) {
  const columns: GridColDef<Pedido>[] = [
    { field: "order_date", headerName: "FECHA DEL PEDIDO", flex: 1, minWidth: 140 },
    {
      field: "category",
      headerName: "CATEGORÍA",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <span
          style={{
            backgroundColor: "#f1f5f9",
            color: "#475569",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "0.76rem",
            fontWeight: 500,
          }}
        >
          {params.value}
        </span>
      ),
    },
    { field: "sub_category", headerName: "SUBCATEGORÍA", flex: 1, minWidth: 140 },
    { field: "region", headerName: "REGIÓN", flex: 1, minWidth: 130 },
    {
      field: "sales",
      headerName: "VENTAS",
      type: "number",
      flex: 0.8,
      minWidth: 110,
      renderCell: (params) => (
        <span style={{ fontWeight: 700, color: "#0f172a" }}>
          {Number(params.value).toLocaleString("es-EC")}
        </span>
      ),
    },
    {
      field: "profit",
      headerName: "GANANCIA",
      type: "number",
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => {
        const valor = Number(params.value);
        return (
          <span
            style={{
              fontWeight: 700,
              color: valor >= 0 ? "#16a34a" : "#dc2626",
            }}
          >
            {valor.toLocaleString("es-EC", { minimumFractionDigits: 2 })}
          </span>
        );
      },
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.03)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Grid container sx={{ justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a" }}>
              Detalle de pedidos{" "}
              <span style={{ fontWeight: 400, color: "#94a3b8" }}>(muestra)</span>
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Registros reales incluidos en la fuente de datos
            </Typography>
          </div>
          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "5px 12px",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#475569",
            }}
          >
            {pedidos.length} registros en la muestra
          </div>
        </Grid>

        {/* Contenedor con desplazamiento horizontal para pantallas móviles (Planificación Fase 3) */}
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <div style={{ minWidth: 780 }}>
            <DataGrid
              rows={pedidos}
              columns={columns}
              rowHeight={52}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 7 },
                },
              }}
              pageSizeOptions={[7, 14, 25]}
              disableRowSelectionOnClick
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#ffffff",
                  color: "#64748b",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                },
                "& .MuiDataGrid-columnSeparator": {
                  display: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #f1f5f9",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "1px solid #e2e8f0",
                },
              }}
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}