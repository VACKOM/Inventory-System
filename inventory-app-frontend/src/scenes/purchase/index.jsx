// import { Box, Typography, useTheme } from "@mui/material";
// import Header from "../../components/Header";

// const Purchase= () =>{

//     return(
//         <Box m="20px">
//         <Box display= "flex" justifyContent="space-between" alignItems="center">
//             <Header title="PURCHASE ORDER" subtitle="Managing Stock Reordering" /> 
//         </Box>   
//     </Box>
//     )
// }

// export default Purchase

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

// Validation Schema
const assetSchema = yup.object().shape({
 
    
    supplier: yup.string().required("Supplier is required"),
    category: yup.string().required("Category is required")
    

});

const Purchase = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State hooks to hold data
  const [category, setCategory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch categories data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("https://node-js-inventory-system.onrender.com/api/category/");
        setCategory(response.data); // Adjust according to your API response
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchCategory();
  }, []);

  // Fetch suppliers data

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("https://node-js-inventory-system.onrender.com/api/supplier/");
        setSuppliers(response.data); // Adjust according to your API response
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);




  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://node-js-inventory-system.onrender.com/api/asset/', values);
      alert('Asset registered successfully!');
      console.log(response.data);
      navigate("/assets");
    } catch (error) {
      console.error('There was an error registering the asset!', error);
      alert('Error registering asset');
    }
  };

  return (
    <Box m="20px">
      <Header title="Create Asset" subtitle="Create a New Assets" />

      <Formik
        initialValues={{
    
          supplier: '',
          category: ''
          


        }}
        validationSchema={assetSchema}
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


              {/* Category Select */}
              <FormControl
                variant="filled"
                fullWidth
                sx={{ gridColumn: "span 2" }}
                error={!!touched.category && !!errors.category}
              >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={values.category}
                  onChange={(e) => {
                    const selectedCategory = e.target.value;
                    setFieldValue('category', selectedCategory);
                    
                  }}
                  onBlur={handleBlur}
                  name="category"
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {category.map((cat) => (
                    <MenuItem key={cat._id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.category && errors.category}</FormHelperText>
              </FormControl>

              {/* Supplier Select */}
              <FormControl
                variant="filled"
                fullWidth
                sx={{ gridColumn: "span 2" }}
                error={!!touched.supplier && !!errors.supplier}
              >
                <InputLabel id="supplier-label">Supplier</InputLabel>
                <Select
                  labelId="supplier-label"
                  id="supplier"
                  value={values.supplier}
                  onChange={(e) => {
                    const selectedSupplier = e.target.value;
                    setFieldValue('supplier', selectedSupplier);
                   
                  }}
                  onBlur={handleBlur}
                  name="supplier"
                  label="Supplier"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {suppliers.map((sup) => (
                    <MenuItem key={sup._id} value={sup.name}>
                      {sup.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.supplier && errors.supplier}</FormHelperText>
              </FormControl>

            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Asset
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Purchase;
