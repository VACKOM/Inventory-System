import React from 'react';
import { Typography, TextField, Box , useTheme} from '@mui/material';
import { tokens } from "../../theme";


const AssetDetails = ({ assets }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const requestingOfficer = assets.length > 0 ? assets[0].requestingOfficer : 'N/A';
    const location = assets.length > 0 ? assets[0].location : 'N/A';
    const requestContact = assets.length > 0 ? assets[0].requestContact : 'N/A';

    return (
        <Box mb={2}>
            <Typography variant="h5"  color={colors.grey[300]}>
                <p>Requesting Officer: {requestingOfficer}</p>
                <p>Contact: {requestContact}</p>
                <p>Job Location: {location}</p>
                <p>Approving Authority: Mike Dua</p>
            </Typography>
           
        </Box>
    );
};

export default AssetDetails;