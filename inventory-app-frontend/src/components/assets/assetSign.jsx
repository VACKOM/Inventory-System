import React, { useState } from 'react';
import { TextField, Typography, Box, useTheme, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl, Grid, Button, Card, CardContent } from '@mui/material';
import { tokens } from "../../theme";
import TypingSelectBox from "../../components/assets/typingSeletct";
import axios from 'axios';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const AssetSign = ({ assets }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [checked, setChecked] = useState(false);
    const [selectedApprovingAuthority, setSelectedApprovingAuthority] = useState('');
    const [selectedCertifyingAuthority, setSelectedCertifyingAuthority] = useState('');
    const [selectedContact, setSelectedContact] = useState('');  // Changed to string (empty string when not selected)
    const [finalSubmit, setFinalSubmit] = useState(''); 
    const [isSecondOtpSent, setIsSecondOtpSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);  // To track the submission state
    const [errorMessage, setErrorMessage] = useState('');  // To track error messages
    const [successMessage, setSuccessMessage] = useState(''); // To track success messages
    const navigate = useNavigate(); // Initialize the navigate function
    const unterTaking = `I, ${assets[0].requestingOfficer} undertake to replace the PC/ Laptop Computer if damaged out of own negligence.`;

    const handleSecondOtpVerified = async (finalSubmit) => {
        console.log(finalSubmit); // This will be called when the OTP is verified

        try {
            // Iterate over assets and make separate requests for each one
            for (let asset of assets) {
                const assetIdString = Array.isArray(asset.assetId) ? asset.assetId[0].toString() : asset.assetId.toString();
                const requestData = {
                    assetId: asset.assetId.toString(),  // Ensure assetId is treated as a string
                    requestingOfficer: asset.requestingOfficer,
                    checked,
                    selectedApprovingAuthority,
                    selectedCertifyingAuthority,
                    selectedContact,
                };

                const response = await axios.post('https://node-js-inventory-system.onrender.com/api/claim/', requestData);
                console.log(response.data);
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


    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
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
                        <Typography variant="h3" color={theme.palette.secondary.main} align="left" gutterBottom>
                            Recipient Undertaking
                        </Typography>

                        <Typography variant="h6" color={colors[200]} align="left" paragraph>
                            {unterTaking}
                        </Typography>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={handleCheckboxChange}
                                    color="primary"
                                    sx={{
                                        '&.Mui-checked': {
                                            color: theme.palette.secondary.main,
                                        },
                                    }}
                                />
                            }
                            label="I agree to the terms"
                            sx={{
                                color: colors[200],
                                display: 'flex',
                                justifyContent: 'left',
                            }}
                        />

                        <Grid container spacing={4} mt={4}>
                            <Grid item xs={12}>
                                <Typography variant="h4" color={theme.palette.secondary.main} align="left" gutterBottom>
                                    Certification
                                </Typography>

                                <FormControl fullWidth variant="filled">
                                    <InputLabel id="approving-authority-label" sx={{ color: colors[100] }}>
                                        Approving Authority
                                    </InputLabel>
                                    <Select
                                        labelId="approving-authority-label"
                                        value={selectedApprovingAuthority}
                                        onChange={handleApprovingAuthorityChange}
                                        label="Approving Authority"
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
                                        <MenuItem value="Alhasan">Alhasan Omare</MenuItem>
                                        <MenuItem value="Jones">Jones Mensah</MenuItem>
                                        <MenuItem value="Sandra">Sandra Siaw</MenuItem>
                                        <MenuItem value="Dennis">Dennis Avor</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
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

                                <TypingSelectBox onContactSelect={handleContactSelect} 
                                onSecondOtpVerified={handleSecondOtpVerified}/>
                                

                                {selectedContact && (
                                    <Typography variant="h6" color={colors[200]} align="left">
                                        Selected Contact: {selectedContact}
                                    </Typography>
                                )}
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
