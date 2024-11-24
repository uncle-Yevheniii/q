import { useState } from "react";
import { Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useRequestHeroes } from "../hooks";
import { useNavigate } from "react-router-dom";

export default function DataTableGrid() {
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  const { infoCharacter, dataCharacter, isLoading, errorMsg } =
    useRequestHeroes(paginationModel);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  const handleClick = (item) => navigate(`${item.id}`);

  return (
    <>
      {!errorMsg ? (
        <DataGrid
          columns={columns}
          rows={dataCharacter}
          rowCount={infoCharacter?.count || 0}
          loading={isLoading}
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
