import { Box, Typography, useTheme, CircularProgress, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Topbar from '../global/Topbar';  // Import your Topbar component


const Assets = ({}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [assets, setAssets] = useState([]);
  const [assetsList, setAssetsList] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function


  // Fetch assets
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('https://node-js-inventory-system.onrender.com/api/asset/');
        setAssets(response.data);
        setLoading(false);  // Data is loaded
      } catch (error) {
        console.error('Error fetching assets:', error);
        setError('Failed to load assets or no assets available');
        setLoading(false);  // Data loading is done, but there was an error
      }
    };
    fetchAssets();
  }, []);

  // Update assets list when assets data is fetched
  useEffect(() => {
    if (assets.length > 0) {
      const combinedData = assets.map((asset) => {
        return {
          ID: asset._id,
          id: asset.assetId, // Ensure each row has a unique 'id' property
          assetId: asset.assetId,
          name: asset.name,
          description: asset.description,
          quantity: asset.quantity ? asset.quantity : 0,
          requestingOfficer: asset.requestingOfficer,
          requestContact: asset.requestContact,
          location: asset.location,
          category: asset.category,
          access: asset.access, // Assuming you have 'access' in your asset data
        };
      });
      setAssetsList(combinedData);
    }
  }, [assets]);

  // Button to generate QR Code
  const handleButtonClick = (rowData) => {
    console.log("Button clicked for asset: ", rowData);
    const qrcode = `Asset ID: ${rowData.assetId}, Asset Name: ${rowData.name}, Asset Description: ${rowData.description}, Asset Location: ${rowData.location}`;
   // alert(qrcode);
    navigate(`/qrcode-generator?qrcode=${encodeURIComponent(qrcode)}`);
  };

  // Button to generate Claims
  const handleClaimClick = (rowData) => {
    navigate(`/claim-asset`);
    
  };

  // Button Add New Asset click handler
  const handleAddButtonClick = () => {
    navigate("/add-asset");
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query state 
  };

  // Filter assets based on the search query
  const filteredAssets = assetsList.filter(asset => {
    const query = searchQuery.toLowerCase(); // Normalize the search query
    return (
      asset.name.toLowerCase().includes(query) ||
      asset.description.toLowerCase().includes(query) ||
      asset.requestingOfficer.toLowerCase().includes(query) ||
      asset.requestContact.toLowerCase().includes(query)
    );
  });

  // Columns for DataGrid
  const columns = [
    { field: "id", headerName: "Asset ID" },
    { field: "name", headerName: "Asset Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "quantity", headerName: "Quantity", type: "number", headerAlign: "left", align: "left" },
    { field: "requestingOfficer", headerName: "Requesting Officer", flex: 1 },
    { field: "requestContact", headerName: "Contact", flex: 1 },
    {
      field: "qrCode", // This field represents the button
      headerName: "QR Code",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="neutral"
          onClick={() => handleButtonClick(params.row)} // Use the row data as needed
        >
          Generate
        </Button>
      ),
      width: 150, // You can adjust the width as needed
    },
  ];

  return (
    <Box m="20px">
      <Box>
        <Topbar onSearch={handleSearch} /> {/* Pass the handleSearch function */}
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Assets List" subtitle="Managing the Assets" />
        <Box display="flex" justifyContent="flex-end" gap="10px">
          <Button
            variant="contained"
            color="neutral"
            onClick={handleAddButtonClick}
          >
            Add New Asset
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleClaimClick}
          >
            Asset Claims
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" variant="h6" align="center">{error}</Typography>
      ) : (
        <Box m="40px 0 0 0" height="75vh">
          <DataGrid checkboxSelection rows={filteredAssets} columns={columns} />
        </Box>
      )}

    </Box>
  );
};

export default Assets;
