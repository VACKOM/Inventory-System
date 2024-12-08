import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

// Validation Schema
const supplierSchema = yup.object().shape({
  supplierId: yup.string(),
  name: yup.string().required("Asset name is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  contactPerson: yup.string().required("Contact Person is required"),
  contactNumber: yup.string().required("Contact Number is required"),
  email: yup.string().required("Contact Number is required")
});

const Supplier = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize the navigate function

  // ID generation logic
  const randomNum = Math.floor(Math.random() * 10000);
  const generateID = `SUP/${randomNum.toString().padStart(4, '0')}`; // Pads the number to always be 4 digits

  // Handle form submission
  const handleSubmit = async (values) => {
    setIsLoading(true); // Set loading to true
    try {
      const response = await axios.post('http://localhost:8080/api/supplier/', values);
      alert('Supplier registered successfully!');
      navigate("/suppliers");
    } catch (error) {
      console.error('Error registering Supplier:', error);
      alert('Error registering Supplier');
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <Box m="20px">
      <Header title="Create Supplier" subtitle="Create a New Supplier" />

      <Formik
        initialValues={{
          supplierId: generateID, // Set the supplier ID as the generated ID
          name: '',
          description: '',
          location:'',
          contactPerson: '',
          contactNumber:'',
          email: ''
        }}
        validationSchema={supplierSchema}
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
              {/* Supplier ID (disabled) */}
              <TextField
                fullWidth
                variant="filled"
                label="Supplier ID"
                value={generateID}
                name="supplierId"
                sx={{ gridColumn: "span 4" }}
                disabled
              />

              {/* Supplier Name */}
              <TextField
                fullWidth
                variant="filled"
                label="Supplier Name"
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

              {/* Location */}
              <TextField
                fullWidth
                variant="filled"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Contact Person */}
              <TextField
                fullWidth
                variant="filled"
                label="Contact Person"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactPerson}
                name="contactPerson"
                error={!!touched.contactPerson && !!errors.contactPerson}
                helperText={touched.contactPerson && errors.contactPerson}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Contact Number*/}
              <TextField
                fullWidth
                variant="filled"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactNumber}
                name="contactNumber"
                error={!!touched.contactNumber && !!errors.contactNumber}
                helperText={touched.contactNumber && errors.contactNumber}
                sx={{ gridColumn: "span 4" }}
              />

               {/* email*/}
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
                sx={{ gridColumn: "span 4" }}
              />

            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button type="submit" color="secondary" variant="contained">
                  Create New Supplier
                </Button>
              )}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Supplier;
