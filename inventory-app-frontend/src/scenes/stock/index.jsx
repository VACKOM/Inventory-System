import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

// Validation Schema
const productSchema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  sku: yup.string().required("SKU is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  brand: yup.string().required("Brand is required"),
  modelNumber: yup.string().required("Model number is required"),
  location: yup.string().required("Location is required"),
  warehouse: yup.string().required("Warehouse is required"),
  supplierName: yup.string().required("Supplier's name is required"),
  productStatus: yup.string().required("Product status is required"),
  warranty: yup.string().required("Warranty information is required")
});

const Stock = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State hooks to hold data
  const [category, setCategory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Fetch categories and suppliers data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("https://node-js-inventory-system.onrender.com/api/category");
        setCategory(response.data); // Adjust according to your API response
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("https://node-js-inventory-system.onrender.com/api/supplier");
        setSuppliers(response.data); // Adjust according to your API response
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  // Helper function to replace part of SKU
//   function replaceAtIndex(originalString, index, textToReplace) {
//     if (index < 0 || index >= originalString.length) {
//       console.error("Index out of bounds");
//       return originalString;
//     }
//     return originalString.slice(0, index) + textToReplace + originalString.slice(index + textToReplace.length);
//   }

  // SKU generation logic (category, supplier, random number)
  const generateSku = (category, supplier) => {
    const categoryPrefix = category.substring(0, 2).toUpperCase();
    const supplierPrefix = supplier.substring(0, 2).toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000);
    return `SKU/${categoryPrefix}/${supplierPrefix}/${randomNum}`;
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://node-js-inventory-system.onrender.com/api/product', values);
      alert('Product registered successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('There was an error registering the product!', error);
      alert('Error registering product');
    }
  };

  return (
    <Box m="20px">
      <Header title="Create Product" subtitle="Create a New Product" />

      <Formik
        initialValues={{
          name: '',
          sku: '',
          description: '',
          category: '',
          brand: '',
          modelNumber: '',
          location: '',
          warehouse: '',
          supplier: '',
          productStatus: 'Active',
          warranty: ''
        }}
        validationSchema={productSchema}
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
              {/* SKU Text Field */}
              <TextField
                fullWidth
                variant="filled"
                label="SKU"
                onBlur={handleBlur}
                value={values.sku}
                name="sku"
                error={!!touched.sku && !!errors.sku}
                helperText={touched.sku && errors.sku}
                sx={{ gridColumn: "span 2" }}
                disabled
              />

              {/* Product Name */}
              <TextField
                fullWidth
                variant="filled"
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              />

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
                    const sku = generateSku(selectedCategory, values.supplierName);
                    setFieldValue('sku', sku);
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
                    const sku = generateSku(values.category, selectedSupplier);
                    setFieldValue('sku', sku);
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

              {/* Other Input Fields */}
              <TextField
                fullWidth
                variant="filled"
                label="Brand"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brand}
                name="brand"
                error={!!touched.brand && !!errors.brand}
                helperText={touched.brand && errors.brand}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="Model Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.modelNumber}
                name="modelNumber"
                error={!!touched.modelNumber && !!errors.modelNumber}
                helperText={touched.modelNumber && errors.modelNumber}
                sx={{ gridColumn: "span 2" }}
              />

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
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="Warehouse"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.warehouse}
                name="warehouse"
                error={!!touched.warehouse && !!errors.warehouse}
                helperText={touched.warehouse && errors.warehouse}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="Warranty"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.warranty}
                name="warranty"
                error={!!touched.warranty && !!errors.warranty}
                helperText={touched.warranty && errors.warranty}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Stock;
