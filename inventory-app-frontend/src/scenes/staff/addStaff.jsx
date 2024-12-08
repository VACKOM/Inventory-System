import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

// Validation Schema
const staffSchema = yup.object().shape({
 
    staffId: yup.string(),
    firstName: yup.string().required("Staff first name is required"),
    middleName: yup.string(),
    lastName: yup.string().required("Staff last name is required"),
    contact: yup.string().required("Contact is required"),
    email: yup.string().required("Email is required"),
    department: yup.string().required("Department type is required")
  
});

const Staff = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State hooks to hold data
  const [department, setDepartment] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch departments data
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/department/");
        setDepartment(response.data); // Adjust according to your API response
      } catch (error) {
        console.error("Error fetching department:", error);
      }
    };
    fetchDepartment();
  }, []);




  // SKU generation logic (department, random number)
  const generateSku = (department) => {
    const departmentPrefix = department.substring(0, 2).toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000);
    return `STAFF/${departmentPrefix}/${randomNum}`;
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/api/staff/', values);
      alert('Staff registered successfully!');
      console.log(response.data);
      navigate("/staff");
    } catch (error) {
      console.error('There was an error registering the staff!', error);
      alert('Error registering staff');
    }
  };

  return (
    <Box m="20px">
      <Header title="Create Staff" subtitle="Create a New Staff" />

      <Formik
        initialValues={{
          staffId: '',
          firstName: '',
          middleName: '',
          lastName: '',
          contact: '',
          email: '',
          department: ''
         

        }}
        validationSchema={staffSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* Staff ID Text Field */}
              <TextField
                fullWidth
                variant="filled"
                label="Staff ID"
                onBlur={handleBlur}
                value={values.staffId}
                name="staffId"
                error={!!touched.staffId && !!errors.staffId}
                helperText={touched.staffId && errors.staffId}
                sx={{ gridColumn: "span 2" }}
                disabled
              />

              {/* Staff First Name */}
              <TextField
                fullWidth
                variant="filled"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Staff Middle Name */}
              <TextField
                fullWidth
                variant="filled"
                label="Middle Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.middleName}
                name="middleName"
                error={!!touched.middleName && !!errors.middleName}
                helperText={touched.middleName && errors.middleName}
                sx={{ gridColumn: "span 2" }}
              />

                {/* Staff Last Name */}
                <TextField
                fullWidth
                variant="filled"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />

               {/* Contact */}
               <TextField
                fullWidth
                variant="filled"
                label="Contact"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Email*/}
              <TextField
                fullWidth
                variant="filled"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />


              {/* Department Select */}
              <FormControl
                variant="filled"
                fullWidth
                sx={{ gridColumn: "span 2" }}
                error={!!touched.department && !!errors.department}
              >
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  value={values.department}
                  onChange={(e) => {
                    const selectedDepartment = e.target.value;
                    setFieldValue('department', selectedDepartment);
                    const sku = generateSku(selectedDepartment, values.department);
                    setFieldValue('staffId', sku);
                  }}
                  onBlur={handleBlur}
                  name="department"
                  label="Department"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {department.map((cat) => (
                    <MenuItem key={cat._id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.department && errors.department}</FormHelperText>
              </FormControl>

             
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Staff
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Staff;
