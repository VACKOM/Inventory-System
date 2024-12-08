import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const AssetGrid = ({ assets }) => {
    const columns = [
        { field: "id", headerName: "Asset ID" },
        { field: "name", headerName: "Asset Name", flex: 1 },
        { field: "description", headerName: "Description", flex: 1 },
        { field: "quantity", headerName: "Quantity", type: "number", headerAlign: "left", align: "left" },
        { field: "condition", headerName: "Condition of Equipments", flex: 1 },
        { field: "serialNo", headerName: "Serial Number", flex: 1 },
    ];

    return (
        <DataGrid
            checkboxSelection
            rows={assets}
            columns={columns}
            getRowId={(row) => row.assetId || row._id}
        />
    );
};

export default AssetGrid;
