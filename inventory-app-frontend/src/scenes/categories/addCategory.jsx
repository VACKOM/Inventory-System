import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

// Validation Schema
const categorySchema = yup.object().shape({
  categoryId: yup.string(),
  name: yup.string().required("Asset name is required"),
  description: yup.string().required("Description is required")
});

const Category = () => {
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
      const response = await axios.post('https://node-js-inventory-system.onrender.com/api/category/', values);
      alert('Category registered successfully!');
      navigate("/categories");
    } catch (error) {
      console.error('Error registering category:', error);
      alert('Error registering category');
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <Box m="20px">
      <Header title="Create Category" subtitle="Create a New Category" />

      <Formik
        initialValues={{
          categoryId: generateID, // Set the category ID as the generated ID
          name: '',
          description: ''
        }}
        validationSchema={categorySchema}
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
              {/* Category ID (disabled) */}
              <TextField
                fullWidth
                variant="filled"
                label="Category ID"
                value={generateID}
                name="categoryId"
                sx={{ gridColumn: "span 4" }}
                disabled
              />

              {/* Category Name */}
              <TextField
                fullWidth
                variant="filled"
                label="Category Name"
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

            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button type="submit" color="secondary" variant="contained">
                  Create New Category
                </Button>
              )}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Category;
