import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

// Validation Schema
const departmentSchema = yup.object().shape({
  departmentId: yup.string(),
  name: yup.string().required("Department name is required"),
  description: yup.string().required("Description is required"),
  head: yup.string().required("head is required"),
  contact: yup.string().required("contact is required"),

});

const Department = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize the navigate function

  // ID generation logic
  const randomNum = Math.floor(Math.random() * 10000);
  const generateID = `ID/${randomNum.toString().padStart(4, '0')}`; // Pads the number to always be 4 digits

  // Handle form submission
  const handleSubmit = async (values) => {
    setIsLoading(true); // Set loading to true
    try {
      const response = await axios.post('https://node-js-inventory-system.onrender.com/api/department/', values);
      alert('Department registered successfully!');
      navigate("/departments");
    } catch (error) {
      console.error('Error registering Department:', error);
      alert('Error registering Department');
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <Box m="20px">
      <Header title="Create Department" subtitle="Create a New Department" />

      <Formik
        initialValues={{
          departmentId: generateID, // Set the department ID as the generated ID
          name: '',
          description: '',
          head: '',
          contact: ''
        }}
        validationSchema={departmentSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
              {/* Department ID (disabled) */}
              <TextField
                fullWidth
                variant="filled"
                label="Department ID"
                value={generateID}
                name="departmentId"
                sx={{ gridColumn: "span 4" }}
                disabled
              />

              {/* Department Name */}
              <TextField
                fullWidth
                variant="filled"
                label="Department Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Description */}
              <TextField
                fullWidth
                variant="filled"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />

            {/* Head */}
              <TextField
                fullWidth
                variant="filled"
                label="Head"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.head}
                name="head"
                error={!!touched.head && !!errors.head}
                helperText={touched.head && errors.head}
                sx={{ gridColumn: "span 4" }}
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
                sx={{ gridColumn: "span 4" }}
              />

            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button type="submit" color="secondary" variant="contained">
                  Create New Department
                </Button>
              )}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Department;
