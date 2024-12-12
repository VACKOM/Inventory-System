import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box, useTheme, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl, Grid, Button, Card, CardContent } from '@mui/material';
import { tokens } from "../../theme";
import TypingSelectBox from "../../components/assets/typingSeletct";
import axios from 'axios';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import AssetGrid from './assetGrid';  // Import AssetGrid component

const AssetSign = ({ assets }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [qtyTaken, setQtyTaken] = useState({}); // Store qtyTaken as an object {assetId: qtyTaken}
    const [onChecked, setOnChecked] = useState(false);
    const [selectedApprovingAuthority, setSelectedApprovingAuthority] = useState('');
    const [selectedCertifyingAuthority, setSelectedCertifyingAuthority] = useState('');
    const [selectedContact, setSelectedContact] = useState('');  // Changed to string (empty string when not selected)
    const [finalSubmit, setFinalSubmit] = useState(''); 
    const[assetIdString, setAssetIdString] = useState('');
    const [isSecondOtpSent, setIsSecondOtpSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);  // To track the submission state
    const [errorMessage, setErrorMessage] = useState('');  // To track error messages
    const [successMessage, setSuccessMessage] = useState(''); // To track success messages
    const navigate = useNavigate(); // Initialize the navigate function
    const unterTaking = `I, ${assets[0].requestingOfficer} undertake to replace the PC/ Laptop Computer if damaged out of own negligence.`;


    const handleSecondOtpVerified = async () => {
        try {
            // Iterate over assets and make separate requests for each one
            for (let asset of assets) {
                const assetIdString = Array.isArray(asset.assetId) ? asset.assetId[0].toString() : asset.assetId.toString();
                console.log(`Asset ID from selected cells ${assetIdString}`)

                // Get the asset details (including name) from the Assets collection
                const assetDetailsResponse = await axios.get(`https://node-js-inventory-system.onrender.com/api/asset/assetId/${encodeURIComponent(assetIdString)}`);
                const assetDetails = assetDetailsResponse.data;  // This will contain the asset details
                console.log(`Name for each Asset ID from selected cells ${assetDetails.name}`)
                
                // Prepare the data to update the asset
                const updatedAssetData = {
                    qtyTaken: qtyTaken[assetIdString],  // Ensure this is part of the updated data
                    requestingOfficer: asset.requestingOfficer,
                    checked: onChecked,
                    selectedApprovingAuthority: "Mike Dua",  // This can be dynamic or static
                    selectedCertifyingAuthority,
                    selectedContact,
                };
    
                // Create a new claim including the asset's name
                const claimData = {
                    assetId: assetIdString,  // Ensure assetId is treated as a string
                    assetName: assetDetails.name,  // Get the asset name
                    requestingOfficer: asset.requestingOfficer,
                    checked: onChecked,
                    selectedApprovingAuthority: "Mike Dua",
                    selectedCertifyingAuthority,
                    selectedContact,
                    qtyTaken: qtyTaken[assetIdString],  // Pass the specific qtyTaken for this asset
                };
    
                // Make the POST request to register the claim
                const response = await axios.post('https://node-js-inventory-system.onrender.com/api/claim/', claimData);
                console.log(response.data);
    
                // Now update the asset in the server
                try {
                    const encodedAssetId = encodeURIComponent(assetIdString);  // Handle assetId or _id
                    const updateResponse = await axios.put(`https://node-js-inventory-system.onrender.com/api/asset/assetId/${encodedAssetId}`, updatedAssetData);
                    console.log('Asset updated:', updateResponse.data);
                } catch (error) {
                    console.error('Error updating asset:', error);
                }
            }
        } catch (error) {
            setErrorMessage('There was an error registering the claim!');
            console.error('Error registering the claim:', error);
            alert('Error registering claim');
        } finally {
            alert('Asset collection process successfully completed!');
            setIsSubmitting(false);  // Re-enable the submit button once the request is complete
            navigate("/assets");
        }
    };
    
    // Callback function to receive qtyTaken and key (e.g., assetId) from AssetGrid
    const handleQtyTakenChange = (key, value) => {
        // Update the qtyTaken state with both the key (e.g., assetId) and value (e.g., qtyTaken)
        setQtyTaken(prevState => ({
            ...prevState,
            [key]: value,  // Dynamically update the key with the new value
        }));
        console.log(`Updated ${key} with quantity taken: ${value}`);
    };

    const handleApprovingAuthorityChange = (event) => {
        setSelectedApprovingAuthority(event.target.value);
    };

    const handleCertifyingAuthorityChange = (event) => {
        setSelectedCertifyingAuthority(event.target.value);
    };

    const handleContactSelect = (contact) => {
        setSelectedContact(contact);  // Set selected contact value
    };

    const handleUndertakenSelect = (check) => {
        setOnChecked(check);  // Set the state with the new value
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);  // Disable the submit button while the form is being submitted
        setErrorMessage('');  // Reset any previous error messages
        setSuccessMessage('');  // Reset any previous success messages
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                minHeight: '100vh',
                backgroundColor: colors.primary[500],
                padding: '20px',
            }}
        >
            <Card sx={{
                width: '100%',
                maxWidth: '1000px',
                backgroundColor: colors.primary[600],
                borderRadius: '16px',
                padding: '30px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            }}>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        {/* AssetGrid is responsible for qtyTaken change */}
                        <AssetGrid assets={assets} onQtyTakenChange={handleQtyTakenChange} />

                        <Grid container spacing={4} mt={4}>
                            <Grid item xs={12}>
                                <Typography variant="h4" color={theme.palette.secondary.main} align="left" gutterBottom>
                                    Certification
                                </Typography>

                                <FormControl fullWidth variant="filled">
                                    <InputLabel id="certifying-authority-label" sx={{ color: colors[100] }}>
                                        Certifying Authority
                                    </InputLabel>
                                    <Select
                                        labelId="certifying-authority-label"
                                        value={selectedCertifyingAuthority}
                                        onChange={handleCertifyingAuthorityChange}
                                        label="Certifying Authority"
                                        sx={{
                                            backgroundColor: colors[700],
                                            color: colors[100],
                                            '& .MuiInputBase-root': {
                                                borderRadius: '8px',
                                            },
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Mary">Mary Ansah</MenuItem>
                                        <MenuItem value="Thelma">Thelma London</MenuItem>
                                        <MenuItem value="Bill">Doris Bill</MenuItem>
                                        <MenuItem value="Eric">Eric Frimpong</MenuItem>
                                    </Select>
                                </FormControl>

                                <TypingSelectBox
                                    onContactSelect={handleContactSelect}
                                    onSecondOtpVerified={handleSecondOtpVerified}
                                    onUndertaken={handleUndertakenSelect}
                                />
                            </Grid>
                        </Grid>

                        {errorMessage && (
                            <Typography variant="h6" color="error" align="left" mt={2}>
                                {errorMessage}
                            </Typography>
                        )}

                        {successMessage && (
                            <Typography variant="h6" color="primary" align="left" mt={2}>
                                {successMessage}
                            </Typography>
                        )}
                    </CardContent>
                </form>
            </Card>
        </Box>
    );
};

export default AssetSign;
