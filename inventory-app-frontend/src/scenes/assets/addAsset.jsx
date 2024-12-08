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
 
    assetId: yup.string().required("SKU is required"),
    name: yup.string().required("Asset name is required"),
    description: yup.string().required("Description is required"),
    quantity: yup.string().required("Quantity is required"),
    assetType: yup.string().required("Asset type is required"),
    serialNo: yup.string().required("Quantity is required"),
    condition: yup.string().required("Condition is required"),
    location: yup.string().required("Asset Location is required"),
    requestingOfficer: yup.string().required("Requesting Officer is required"),
    requestContact: yup.string().required("Request contact is required"),
    reason:  yup.string().required("Request reason is required"),
    supplier: yup.string().required("Supplier is required"),
    category: yup.string().required("Category is required")
    

});

const Asset = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State hooks to hold data
  const [category, setCategory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch categories data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/category/");
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
        const response = await axios.get("http://localhost:8080/api/supplier/");
        setSuppliers(response.data); // Adjust according to your API response
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);



  // SKU generation logic (category, supplier, random number)
  const generateSku = (category, supplier) => {
    const categoryPrefix = category.substring(0, 2).toUpperCase();
    const supplierPrefix = supplier.substring(0, 2).toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000);
    return `AssetID/${categoryPrefix}/${supplierPrefix}/${randomNum}`;
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/api/asset/', values);
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
      <Header title="Create Asset" subtitle="Create a New Asset" />

      <Formik
        initialValues={{
          assetId: '',
          name: '',
          description: '',
          quantity: '',
          assetType: '',
          serialNo: '',
          condition: '',
          location: '',
          requestingOfficer: '',
          requestContact: '',
          reason:  '',
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
              {/* SKU Text Field */}
              <TextField
                fullWidth
                variant="filled"
                label="Asset ID"
                onBlur={handleBlur}
                value={values.assetId}
                name="assetId"
                error={!!touched.assetId && !!errors.assetId}
                helperText={touched.assetId && errors.assetId}
                sx={{ gridColumn: "span 2" }}
                disabled
              />

              {/* Asset Name */}
              <TextField
                fullWidth
                variant="filled"
                label="Asset Name"
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

               {/* Quantity */}
               <TextField
                fullWidth
                variant="filled"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Serial Number */}
              <TextField
                fullWidth
                variant="filled"
                label="Serial Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.serialNo}
                name="serialNo"
                error={!!touched.serialNo && !!errors.serialNo}
                helperText={touched.serialNo && errors.serialNo}
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
                    const sku = generateSku(selectedCategory, values.category);
                    setFieldValue('assetId', sku);
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
                    setFieldValue('assetId', sku);
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
                label="Asset Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.assetType}
                name="assetType"
                error={!!touched.assetType && !!errors.assetType}
                helperText={touched.assetType && errors.assetType}
                sx={{ gridColumn: "span 2" }}
              />

             <TextField
                fullWidth
                variant="filled"
                label="Condition of Asset"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.condition}
                name="condition"
                error={!!touched.condition && !!errors.condition}
                helperText={touched.condition && errors.condition}
                sx={{ gridColumn: "span 2" }}
              />


              <TextField
                fullWidth
                variant="filled"
                label="Requesting Officer"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.requestingOfficer}
                name="requestingOfficer"
                error={!!touched.requestingOfficer && !!errors.requestingOfficer}
                helperText={touched.requestingOfficer && errors.requestingOfficer}
                sx={{ gridColumn: "span 2" }}
              />

             <TextField
                fullWidth
                variant="filled"
                label="Request Contact"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.requestContact}
                name="requestContact"
                error={!!touched.requestContact && !!errors.requestContact}
                helperText={touched.requestContact && errors.requestContact}
                sx={{ gridColumn: "span 2" }}
              />

             <TextField
                fullWidth
                variant="filled"
                label="Request Reason"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reason}
                name="reason"
                error={!!touched.reason && !!errors.reason}
                helperText={touched.reason && errors.reason}
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

export default Asset;
