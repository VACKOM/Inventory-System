import { Box, Typography, useTheme, CircularProgress, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Topbar from '../global/Topbar';  // Import your Topbar component

const Categories = ({}) => { // Default searchQuery to an empty string if not provided
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categories, setCategories] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://node-js-inventory-system.onrender.com/api/category/');
        const combinedData = response.data.map((category) => ({
          id: category.categoryId,  // Unique 'id' for DataGrid
          categoryId: category.categoryId,
          name: category.name,
          description: category.description,
        }));
        setCategoriesList(combinedData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories or no categories found');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, []);
  

  // Update categories list when categories data is fetched
  useEffect(() => {
    if (categories.length > 0) {
      const combinedData = categories.map((category) => {
        return {
          id: category.categoryId, // Ensure each row has a unique 'id' property
          categoryId: category.categoryId,
          name: category.name,
          description: category.description,
        };
      });
      setCategoriesList(combinedData);
    }
  }, [categories]);

  const handleButtonClick = (rowData) => {
    console.log("Button clicked for category: ", rowData);
    
  };

 // Button Add New Category click handler
 const handleAddButtonClick = () => {
  // Navigate to the 'Add Category' page
  navigate("/add-category");
};

const handleSearch = (query) => {
  setSearchQuery(query); // Update the search query state
};


 // Filter categories based on the search query
const filteredCategories = categoriesList.filter(category => {
    const query = searchQuery.toLowerCase(); // Normalize the search query
    return (
      String(category.categoryId).toLowerCase().includes(query) ||  // Convert to string
      category.name.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    );
  });
  


  // Columns for DataGrid
  const columns = [
    { field: "id", headerName: "Category ID" },
    { field: "name", headerName: "Category Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "update", // This field represents the button
      headerName: "Update Category",
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
      headerName: "Delete Category",
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
      {/* Other parts of the Categories component */}
    </Box>
    {/* Header with button on the right */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      
      <Header title="Categories List" subtitle="Managing the Categories" />
      <Button
        variant="contained"
        color="neutral"
        onClick={handleAddButtonClick}
      >
        Add New Category
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
         <DataGrid checkboxSelection rows={filteredCategories} columns={columns} />
      </Box>
    )}
  </Box>
  );
};

export default Categories;
