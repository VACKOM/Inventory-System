import { Box, Typography, useTheme, CircularProgress, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Topbar from '../global/Topbar';  // Import your Topbar component

const Staff = ({}) => { // Default searchQuery to an empty string if not provided
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [staff, setStaff] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch staff
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/staff/');
        setStaff(response.data);
        setLoading(false);  // Data is loaded
      } catch (error) {
        console.error('Error fetching staff:', error);
        setError('Failed to load staff or no Staff available');
        setLoading(false);  // Data loading is done, but there was an error
      }
    };
    fetchStaff();
  }, []);

  // Update staff list when staff data is fetched
  useEffect(() => {
    if (staff.length > 0) {
      const combinedData = staff.map((staff) => {
        return {
            
          id: staff.staffId, // Ensure each row has a unique 'id' property
          staffId: staff.staffId,
          firstName: staff.firstName,
          middleName: staff.middleName,
          lastName: staff.lastName,
          contact: staff.contact,
          email: staff.email,
          department: staff.department
          
        };
      });
      setStaffList(combinedData);
    }
  }, [staff]);


 // Button Add New Staff click handler
 const handleAddButtonClick = () => {
  // Navigate to the 'Add Staff' page
  navigate("/add-staff");
};

const handleButtonClick = (rowData) => {
    console.log("Button clicked for Staff: ", rowData);
    
  };


const handleSearch = (query) => {
  setSearchQuery(query); // Update the search query state
};


 // Filter staff based on the search query
 const filteredStaff = staffList.filter(staff => {
  const query = searchQuery.toLowerCase(); // Normalize the search query
  return (
    staff.firstName.toLowerCase().includes(query) ||
    staff.lastName.toLowerCase().includes(query) ||
    staff.contact.toLowerCase().includes(query) ||
    staff.email.toLowerCase().includes(query) ||
    staff.department.toLowerCase().includes(query)

  );
});


  // Columns for DataGrid
  const columns = [
    { field: "id", headerName: "Staff ID" },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "middleName", headerName: "Middle Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "contact", headerName: "Contact", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    
    {
        field: "update", // This field represents the button
        headerName: "Update Staff",
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
        headerName: "Delete Staff",
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
      {/* Other parts of the Staff component */}
    </Box>
    {/* Header with button on the right */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      
      <Header title="Staff List" subtitle="Managing the Staff" />
      <Button
        variant="contained"
        color="neutral"
        onClick={handleAddButtonClick}
      >
        Add New Staff
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
         <DataGrid checkboxSelection rows={filteredStaff} columns={columns} />
      </Box>
    )}
  </Box>
  );
};

export default Staff;
