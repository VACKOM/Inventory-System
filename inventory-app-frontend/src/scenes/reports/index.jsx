import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Select, MenuItem, InputLabel, FormControl, TextField, CircularProgress, Snackbar } from '@mui/material';

function Reports() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Fetch the list of tables and fields from the backend
  useEffect(() => {
    setLoading(true);
    axios.get('https://node-js-inventory-system.onrender.com/api/tables')
      .then(response => {
        setTables(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching tables.');
        setLoading(false);
      });
  }, []);

  // Handle table selection
  const handleTableChange = (e) => {
    const table = e.target.value;
    setSelectedTable(table);
    const tableFields = tables.find(t => t.name === table)?.fields || [];
    setFields(tableFields);
    setSelectedField('');
    setFieldValue('');
  };

  // Handle field selection
  const handleFieldChange = (e) => {
    const field = e.target.value;
    setSelectedField(field);
  };

  // Handle value input for the selected field
  const handleFieldValueChange = (e) => {
    setFieldValue(e.target.value);
  };

  // Generate report by sending the field and its value for filtering
  const generateReport = () => {
    if (!selectedField || !fieldValue) {
      setError("Please select a field and enter a value.");
      setShowSnackbar(true);
      return;
    }

    setLoading(true);
    axios.post('https://node-js-inventory-system.onrender.com/api/tables/getReportData', {
      table: selectedTable,
      field: selectedField,
      value: fieldValue,
    })
      .then(response => {
        if (response.data.length === 0) {
          setError('No data found for the selected filter.');
          setShowSnackbar(true);
          resetPage();  // Reset page after showing the error message
        } else {
          setReportData(response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching report data.');
        setShowSnackbar(true);
        resetPage();  // Reset page after showing the error message
        setLoading(false);
      });
  };

  // Reset the page to its initial state
  const resetPage = () => {
    setSelectedTable('');
    setSelectedField('');
    setFieldValue('');
    setReportData([]);
  };

  const rows = reportData.map((row, index) => ({
    id: index,  // DataGrid requires an 'id' field for each row
    ...row,
  }));

  // Filter out the selected field from the columns before passing it to DataGrid
  const columns = fields
    .filter(field => field.field !== selectedField)  // Exclude the search field
    .map((field) => {
      const fieldName = field.displayName || field.field;
      return {
        field: fieldName,
        headerName: fieldName.charAt(0).toUpperCase() + fieldName.slice(1), // Capitalize the field name
        width: 150,
      };
    });

  return (
    <Box sx={{ padding: 3 }}>
      <h1>Report Generator</h1>

      {/* Table Selection */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select Report Type</InputLabel>
        <Select
          value={selectedTable}
          onChange={handleTableChange}
          label="Select Report"
          disabled={loading}
        >
          <MenuItem value="">Select Report Type</MenuItem>
          {tables.map((table) => (
            <MenuItem key={table.name} value={table.name}>
              {table.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Field Selection */}
      {selectedTable && (
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Search By</InputLabel>
          <Select
            value={selectedField}
            onChange={handleFieldChange}
            label="Select Field"
            disabled={loading}
          >
            <MenuItem value="">Select a Field</MenuItem>
            {fields.map((field) => (
              <MenuItem key={field.field} value={field.field}>{field.displayName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Field Value Input */}
      {selectedField && (
        <TextField
          label={`Enter value for ${selectedField}`}
          value={fieldValue}
          onChange={handleFieldValueChange}
          fullWidth
          sx={{ marginBottom: 2 }}
          disabled={loading}
        />
      )}

      {/* Generate Report Button */}
      <Button variant="contained" color="secondary" onClick={generateReport} sx={{ marginBottom: 3 }} disabled={loading}>
        Generate Report
      </Button>

      {/* Loading Indicator */}
      {loading && <CircularProgress sx={{ marginBottom: 3 }} />}

      {/* Error Handling */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        message={error}
      />

      {/* DataGrid for Report Display */}
      {reportData.length > 0 && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}  // Pass filtered columns (without selectedField)
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      )}
    </Box>
  );
}

export default Reports;
