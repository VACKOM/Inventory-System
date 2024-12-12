import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const AssetGrid = ({ assets, onQtyTakenChange }) => {
    // Store assets locally for editing
    const [assetsList, setAssetsList] = useState(
        assets.map(asset => ({ ...asset, qtyTaken: "" }))
    );

    // Object to store edited qtyTaken values for each asset
    const [qtyTakenValues, setQtyTakenValues] = useState({});

    // Define columns with the 'editable' property for quantity
    const columns = [
        { field: "assetId", headerName: "Asset ID", width: 150 },
        { field: "name", headerName: "Asset Name", flex: 1 },
        { field: "description", headerName: "Description", flex: 1 },
        { field: "quantity", headerName: "Quantity Supplied", type: "number", headerAlign: "left", align: "left", editable: false },
        { field: "serialNo", headerName: "Serial Number", flex: 1 },
        { field: "qtyTaken", headerName: "Quantity Taken", flex: 1, editable: true }, // Make qtyTaken editable
    ];

    const handleRowEdit = (updatedRow) => {
        console.log(`Updated row when the cell is clicked ${updatedRow.assetId}`);

        // Ensure qtyTaken is a valid number
        const qtyTakenValue = Number(updatedRow.qtyTaken);

        if (isNaN(qtyTakenValue)) {
            console.error('Invalid qtyTaken value:', updatedRow.qtyTaken);  // Log invalid qtyTaken
            return;  // Ignore invalid qtyTaken if it's not a number
        }

        // Update the qtyTaken value in the state
        setQtyTakenValues(prevValues => ({
            ...prevValues,
            [updatedRow.assetId]: qtyTakenValue, // Store the qtyTaken for each assetId
        }));

        // Optionally, update the assetsList to reflect changes
        setAssetsList(prevAssets =>
            prevAssets.map(asset => {
                if (asset.assetId === updatedRow.assetId) {
                    return { ...asset, qtyTaken: qtyTakenValue };
                }
                return asset;
            })
        );

        // Optionally, you can notify the parent about the change
        if (onQtyTakenChange) {
            onQtyTakenChange(updatedRow.assetId, qtyTakenValue); // Passing assetId and qtyTaken value
        }

        // Return the updated row to the DataGrid for processing
        return { ...updatedRow, qtyTaken: qtyTakenValue };
    };

    return (
        <div>
            <DataGrid
                rows={assetsList}
                columns={columns}
                getRowId={(row) => row.assetId || row._id}  // Use the correct ID for row uniqueness
                processRowUpdate={handleRowEdit}  // Handle row edits
            />

            {/* Optionally, display the qtyTaken values for debugging */}
            <div>
                <h3>Edited qtyTaken values:</h3>
                <pre>{JSON.stringify(qtyTakenValues, null, 2)}</pre>
            </div>
        </div>
    );
};

export default AssetGrid;
