import { useState, useEffect } from 'react';
import { Box, Typography, useTheme, CircularProgress, Select, TextField, MenuItem, Button, InputLabel,FormControl } from "@mui/material";
import { tokens } from "../../theme";
import axios from 'axios';

const TypingSelectBox = ({ onContactSelect, onSecondOtpVerified  }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const [otp, setOtp] = useState(''); // OTP input
  const [isOtpSent, setIsOtpSent] = useState(false); // Flag to check if OTP was sent
  const [otpId, setOtpId] = useState(''); // Store OTP ID for verification
  const [isFirstOtpVerified, setIsFirstOtpVerified] = useState(false); // Flag to check if first OTP is verified
  const [isSecondOtpSent, setIsSecondOtpSent] = useState(false); // Flag to track if second OTP was sent
  const [isSecondOtpVerified, setIsSecondOtpVerified] = useState(false);
  const [showSecondOtpButton, setShowSecondOtpButton] = useState(false); // Flag for second OTP button

  // Fetch assets (your contacts data)
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/staff/');
        setOptions(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load contacts');
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const final ="false"

  // Handle OTP sending
  const sendOTP = async () => {
    if (!selectedOption) {
      alert("Please select a contact first!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/otp/send-otp/', { phoneNumber: selectedOption });
      setOtpId(response.data.otpId); // Store the otpId for later verification
      setOtp('');  // Clear the OTP input field for second OTP
      alert('OTP successfully sent!');
      setIsOtpSent(true);  // Flag to show OTP verification input
      // Store selected contact in sessionStorage
      sessionStorage.setItem('selectedContact', selectedOption);
    } catch (error) {
      alert('Error sending OTP');
      console.error(error);
    }
  };

  // Handle OTP verification
  const verifyOTP = async () => {
    if (!otp || !otpId) {
      alert('Please enter OTP and ensure OTP ID is available!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/otp/verify-otp/', { phoneNumber: selectedOption, otp, otpId });
      if (response.data.success) {
        alert('OTP verified successfully!');
        setIsFirstOtpVerified(true); // Mark first OTP as verified
        setShowSecondOtpButton(true); // Show second OTP button
      } else {
        alert('Invalid OTP!');
      }
    } catch (error) {
      alert('Error verifying OTP');
      console.error(error);
    }
  };


  // Handle final OTP verification
  const verifyOTP2 = async () => {
    if (!otp || !otpId) {
      alert('Please enter OTP and ensure OTP ID is available!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/otp/verify-otp/', { phoneNumber: selectedOption, otp, otpId });
      if (response.data.success) {
        alert('OTP verified successfully!');
        const finalSubmit = "true";
        setIsSecondOtpVerified(true);
        onSecondOtpVerified(finalSubmit); // Call the function passed from parent
      } else {
        alert('Invalid OTP!');
      }
    } catch (error) {
      alert('Error verifying OTP');
      console.error(error);
    }
  };

  // Handle second OTP sending
  const sendSecondOTP = async () => {
    if (!selectedOption) {
      alert("Please select a contact first!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/otp/send-otp/', { phoneNumber: selectedOption });
      setOtpId(response.data.otpId); // Store new otpId for the second OTP verification
      setOtp('');  // Clear the OTP input field for second OTP
      alert('Second OTP successfully sent!');
      setIsSecondOtpSent(true);  // Mark second OTP as sent
    } catch (error) {
      alert('Error sending second OTP');
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event) => {
    const selectedContact = event.target.value;
    setSelectedOption(selectedContact);
    onContactSelect(selectedContact); // Call the function passed from parent
  };

  const filteredOptions = options.filter(option =>
    option.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      {/* Conditionally render the contact selection part only if OTP has not been sent and no contact is selected */}
      {!selectedOption && !isOtpSent && (
        <>
          <Typography variant="h6" gutterBottom sx={{ padding: '20px' }}>
            Collecting Staff Contact:
          </Typography>

          <TextField
            type="filled"
            id="contact-select"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Start typing Staff Number to select..."
            fullWidth
          />

          {loading ? (
            <CircularProgress size={24} />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <>

<FormControl fullWidth variant="filled">
                                    <InputLabel id="selected-contact-label" sx={{ color: colors[100] }}>
                                        Select Staff Contact
                                    </InputLabel>
                                    <Select
                                        labelId="selected-contact-label"
                                        value={selectedOption}
                                        onChange={handleSelectChange}
                                        label="Selected  Staff Contact"
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
                                  
                                        {filteredOptions.map((option, index) => (
                                        <MenuItem key={index} value={option.contact}>
                                          {option.contact}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                </FormControl>

                {selectedOption && (
                <Typography variant="h6" style={{ marginTop: '10px' }}>
                  Selected Contact: {selectedOption}
                </Typography>
              )}
            </>
          )}
        </>
      )}

      {/* OTP input after sending OTP */}
      {isOtpSent && !isFirstOtpVerified && (
        <Box mt={4} sx={{ padding: '20px' }}> 
          <Typography variant="h6">Enter OTP</Typography>
          <TextField
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            fullWidth
            sx={{
              marginBottom: '16px',  // Padding below the TextField
              padding: '12px',  // Padding inside the TextField for more spacing
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={verifyOTP}
            sx={{
              padding: "12px 30px",
              borderRadius: '12px',
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Verify OTP
          </Button>
        </Box>
      )}

      {/* Show second OTP button after first OTP is verified */}
      {showSecondOtpButton && !isSecondOtpSent && (
        <Box mt={4} display="flex" justifyContent="right">
          <Button
            variant="contained"
            color="secondary"
            onClick={sendSecondOTP}
            sx={{
              padding: "12px 30px",
              borderRadius: '12px',
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Send Acceptance Code
          </Button>
        </Box>
      )}

      {/* Send Collection Code button is always visible only if OTP hasn't been sent */}
      {!isOtpSent && (
        <Box mt={4} display="flex" justifyContent="right">
          <Button
            variant="contained"
            color="secondary"
            onClick={sendOTP}
            sx={{
              padding: "12px 30px",
              borderRadius: '12px',
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Send Collection Code
          </Button>
        </Box>
      )}

      {isSecondOtpSent && (
        <Box mt={4}>
          <Typography variant="h6">Enter Acceptance OTP</Typography>
          <TextField
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            fullWidth
            sx={{ marginTop: '10px' }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={verifyOTP2}
            sx={{
              padding: '12px 30px',
              borderRadius: '12px',
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Verify OTP
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TypingSelectBox;
