import { useState } from "react";
import { useRequest } from "ahooks";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";

import { requestHeroes } from "../api";

export default function DataTableGrid() {
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  const { data, error, loading } = useRequest(
    () => requestHeroes(paginationModel.page + 1),
    { refreshDeps: [paginationModel.page] }
  );

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  const handleClick = (params: GridRowParams) => navigate(`${params.id}`);

  return (
    <>
      {!error ? (
        <DataGrid
          columns={columns}
          rows={data?.results || []}
          rowCount={data?.info?.count || 0}
          loading={loading}
          pageSizeOptions={[20]}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onRowClick={handleClick}
        />
      ) : (
        <Alert variant="outlined" severity="error">
          Error loading data. Please try again later.
        </Alert>
      )}
    </>
  );
}
