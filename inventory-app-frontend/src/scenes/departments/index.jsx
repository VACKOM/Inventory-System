import { Box, Typography, useTheme, CircularProgress, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Topbar from '../global/Topbar';  // Import your Topbar component

const Departments = ({}) => { // Default searchQuery to an empty string if not provided
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [departments, setDepartments] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/department/');
        const combinedData = response.data.map((department) => ({
          id: department.departmentId,  // Unique 'id' for DataGrid
          departmentId: department.departmentId,
          name: department.name,
          description: department.description,
          head: department.head,
          contact: department.contact
          

        }));
        setDepartmentsList(combinedData);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setError('Failed to load departments or no departments available');
      } finally {
        setLoading(false);
      }
    };
  
    fetchDepartments();
  }, []);
  

  // Update departments list when departments data is fetched
  useEffect(() => {
    if (departments.length > 0) {
      const combinedData = departments.map((department) => {
        return {
            id: department.departmentId,  // Unique 'id' for DataGrid
            departmentId: department.departmentId,
            name: department.name,
            description: department.description,
            head: department.head,
            contact: department.contact
            
        };
      });
      setDepartmentsList(combinedData);
    }
  }, [departments]);

  const handleButtonClick = (rowData) => {
    console.log("Button clicked for department: ", rowData);
    
  };

 // Button Add New Department click handler
 const handleAddButtonClick = () => {
  // Navigate to the 'Add Department' page
  navigate("/add-department");
};

const handleSearch = (query) => {
  setSearchQuery(query); // Update the search query state
};


 // Filter departments based on the search query
const filteredDepartments = departmentsList.filter(department => {
    const query = searchQuery.toLowerCase(); // Normalize the search query
    return (
      String(department.departmentId).toLowerCase().includes(query) ||  // Convert to string
      department.name.toLowerCase().includes(query) ||
      department.description.toLowerCase().includes(query) ||
      department.contact.toLowerCase().includes(query) ||
      department.head.toLowerCase().includes(query)
    );
  });
  


  // Columns for DataGrid
  const columns = [
    { field: "id", headerName: "Department ID" },
    { field: "name", headerName: "Department Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "head", headerName: "Head", flex: 1 },
    { field: "contact", headerName: "Contact", flex: 1 },
    {
      field: "update", // This field represents the button
      headerName: "Update Department",
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
      headerName: "Delete Department",
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
      {/* Other parts of the Departments component */}
    </Box>
    {/* Header with button on the right */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      
      <Header title="Departments List" subtitle="Managing the Departments" />
      <Button
        variant="contained"
        color="neutral"
        onClick={handleAddButtonClick}
      >
        Add New Department
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
         <DataGrid checkboxSelection rows={filteredDepartments} columns={columns} />
      </Box>
    )}
  </Box>
  );
};

export default Departments;
