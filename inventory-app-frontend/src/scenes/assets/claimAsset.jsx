import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, TextField, Button } from "@mui/material";
import axios from 'axios';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import AssetGrid from '../../components/assets/assetGrid';  // Import the AssetGrid component
import AssetDetails from '../../components/assets/assetDetails';  // Import the AssetDetails component
import AssetSign from '../../components/assets/assetSign';
import { useLocation } from 'react-router-dom';

const Claims = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [requestInput, setRequestInput] = useState('');
    const [assets, setAssets] = useState([]);
    const [assetsList, setAssetsList] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false);  // Track if data is loaded
    const location = useLocation();

    // Extract query parameters (use URLSearchParams to read the query string)
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const requestInputFromURL = queryParams.get('requestInput');
        if (requestInputFromURL) {
            setRequestInput(requestInputFromURL); // Update the state with the query parameter
        }
    }, [location.search]);

    // Fetch assets based on requestInput (assetId, name, or phone number)
    const fetchAssets = async () => {
        if (!requestInput) {
            setError('Please enter an asset ID, name, or contact number');
            return;
        }
        setLoading(true);
        setError('');  // Reset error state

        try {
            let url = '';

            // Check if the requestInput is a valid assetId (e.g., numeric or alphanumeric)
            const isAssetId = /^[A-Za-z0-9\/]+$/.test(requestInput); // Regex to check if input is alphanumeric
            const isContact = /^[0-9]+$/.test(requestInput); // Regex to check if input is numeric (for contact number)
            
             if (isContact) {
                // Search by contact number
                url = `https://node-js-inventory-system.onrender.com/api/asset/contact/${requestInput}`;
            } else if (isAssetId){
                // Encode the requestInput (assetId) to handle special characters
                const encodedAssetId = encodeURIComponent(requestInput);
                // Construct the URL with the encoded assetId
                url = `https://node-js-inventory-system.onrender.com/api/asset/assetId/${encodedAssetId}`;
            }   else {
                // Search by name
                url = `https://node-js-inventory-system.onrender.com/api/asset/name/${requestInput}`;
            }

            const response = await axios.get(url);
            setAssets(response.data);
            setLoading(false);
            setIsDataLoaded(true);  // Set the state to true after data is loaded
        } catch (error) {
            console.error('Error fetching assets:', error);
            setError('Failed to load assets');
            setLoading(false);
        }
    };

    // Trigger fetchAssets whenever the requestInput state changes
    useEffect(() => {
        if (requestInput) {
            fetchAssets();  // Trigger asset fetch whenever requestInput changes
        }
    }, [requestInput]);

    // Update assets list whenever assets data changes
    useEffect(() => {
        if (assets.length > 0) {
            const combinedData = assets.map((asset) => ({
                id: asset.assetId || asset._id,
                assetId: asset.assetId,
                name: asset.name,
                description: asset.description,
                quantity: asset.quantity || 0,
                requestingOfficer: asset.requestingOfficer,
                requestContact: asset.requestContact,
                serialNo: asset.serialNo,
                location: asset.location,
                condition: asset.condition,
                category: asset.category,
                access: asset.access,  // Assuming 'access' exists in your data
            }));
            setAssetsList(combinedData);
        }
    }, [assets]);

    // Filter assets based on the search query
    const filteredAssets = assetsList.filter(asset => {
        const query = searchQuery.toLowerCase();
        return (
            asset.name.toLowerCase().includes(query) ||
            asset.description.toLowerCase().includes(query) ||
            asset.requestingOfficer.toLowerCase().includes(query) ||
            asset.requestContact.toLowerCase().includes(query)
        );
    });

    // Handle form submission (Fetch assets based on phone number or name)
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchAssets();  // Trigger the fetchAssets function when the form is submitted
    };


    if (!isOpen) return null;

    return (
        <Box m="20px">
            <Box display="flex" flexDirection="column" gap="20px" mt="20px">
                <Header title="Assets Claims" subtitle="Managing Assets Claims" />

                {/* Show the form only if the data is not loaded yet */}
                {!isDataLoaded && (
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" gap="20px" sx={{ "& > div": { flex: 1 } }}>
                            {/* Phone Number or Name Input */}
                            <TextField
                                fullWidth
                                variant="filled"
                                id="requestInput"
                                value={requestInput}
                                onChange={(e) => setRequestInput(e.target.value)}
                                label="Enter Staff Name or Phone Number"
                            />
                            {/* Search Assets Input */}
                            <TextField
                                label="Search Assets"
                                variant="outlined"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                fullWidth
                            />
                        </Box>

                        <Box display="flex" justifyContent="start" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">Fetch Assets</Button>
                        </Box>
                    </form>
                )}
            </Box>

            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-96">
                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    {/* Show the grid only after assets are retrieved */}
                    {assetsList.length > 0 && !loading && (
                        <Box m="40px 0 0 0" height="45vh">
                            <AssetDetails assets={assets} />
                            {/* <AssetGrid assets={filteredAssets} /> */}
                            <AssetSign assets={assets} />
                        </Box>
                    )}

                    {/* Show loading indicator */}
                    {loading && (
                        <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
                            <CircularProgress />
                        </Box>
                    )}
                </div>
            </div>
        </Box>
    );
};

export default Claims;
