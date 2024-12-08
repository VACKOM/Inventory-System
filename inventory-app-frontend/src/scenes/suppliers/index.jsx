import { Box, Typography, useTheme, CircularProgress, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Topbar from '../global/Topbar';  // Import your Topbar component

const Suppliers = ({}) => { // Default searchQuery to an empty string if not provided
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [suppliers, setSuppliers] = useState([]);
  const [suppliersList, setSuppliersList] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch suppliers
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('https://node-js-inventory-system.onrender.com/api/supplier/');
        const combinedData = response.data.map((supplier) => ({
          id: supplier.supplierId,  // Unique 'id' for DataGrid
          supplierId: supplier.supplierId,
          name: supplier.name,
          description: supplier.description,
          location: supplier.location,
          contactPerson: supplier.contactPerson,
          contactNumber: supplier.contactNumber,
          email: supplier.email


        }));
        setSuppliersList(combinedData);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        setError('Failed to load suppliers or no suppliers found');
      } finally {
        setLoading(false);
      }
    };
  
    fetchSuppliers();
  }, []);
  

  // Update suppliers list when suppliers data is fetched
  useEffect(() => {
    if (suppliers.length > 0) {
      const combinedData = suppliers.map((supplier) => {
        return {
            id: supplier.supplierId,  // Unique 'id' for DataGrid
            supplierId: supplier.supplierId,
            name: supplier.name,
            description: supplier.description,
            location: supplier.location,
            contactPerson: supplier.contactPerson,
            contactNumber: supplier.contactNumber,
            email: supplier.email
        };
      });
      setSuppliersList(combinedData);
    }
  }, [suppliers]);

  const handleButtonClick = (rowData) => {
    console.log("Button clicked for supplier: ", rowData);
    
  };

 // Button Add New Supplier click handler
 const handleAddButtonClick = () => {
  // Navigate to the 'Add Supplier' page
  navigate("/add-supplier");
};

const handleSearch = (query) => {
  setSearchQuery(query); // Update the search query state
};


 // Filter suppliers based on the search query
const filteredSuppliers = suppliersList.filter(supplier => {
    const query = searchQuery.toLowerCase(); // Normalize the search query
    return (
      String(supplier.supplierId).toLowerCase().includes(query) ||  // Convert to string
      supplier.name.toLowerCase().includes(query) ||
      supplier.description.toLowerCase().includes(query) ||
      supplier.contactNumber.toLowerCase().includes(query) ||
      supplier.contactPerson.toLowerCase().includes(query)
    );
  });
  


  // Columns for DataGrid
  const columns = [
    { field: "id", headerName: "Supplier ID" },
    { field: "name", headerName: "Supplier Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "contactPerson", headerName: "Contact Person", flex: 1 },
    { field: "contactNumber", headerName: "Contact", flex: 1 },
    {
      field: "update", // This field represents the button
      headerName: "Update Supplier",
      renderCell: (params) => (
        <Button
          variant="contained"
          color= "secondary"
          onClick={() => handleButtonClick(params.row)} // Use the row data as needed
        >
          Edit
        </Button>
      ),
      width: 150, // You can adjust the width as needed
    },
    {
      field: "delete", // This field represents the button
      headerName: "Delete Supplier",
      renderCell: (params) => (
        <Button
          variant="contained"
          color= "neutral"
          onClick={() => handleButtonClick(params.row)} // Use the row data as needed
        >
          Delete
        </Button>
      ),
      width: 150, // You can adjust the width as needed
    },
  ];

  return (
    
    <Box m="20px">
      <Box>
      <Topbar onSearch={handleSearch} /> {/* Pass the handleSearch function */}
      {/* Other parts of the Suppliers component */}
    </Box>
    {/* Header with button on the right */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      
      <Header title="Suppliers List" subtitle="Managing the Suppliers" />
      <Button
        variant="contained"
        color="neutral"
        onClick={handleAddButtonClick}
      >
        Add New Supplier
      </Button>
    </Box>

    
    
    {loading ? (
      <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
        <CircularProgress />
      </Box>
    ) : error ? (
      <Typography color="error" variant="h6" align="center">{error}</Typography>
    ) : (
      <Box m="40px 0 0 0" height="75vh">
         <DataGrid checkboxSelection rows={filteredSuppliers} columns={columns} />
      </Box>
    )}
  </Box>
  );
};

export default Suppliers;
