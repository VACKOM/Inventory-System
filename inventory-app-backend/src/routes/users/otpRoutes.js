

// Rate limiting constants
const OTP_REQUEST_LIMIT = 20; // Max OTP requests per phone number
const OTP_REQUEST_TIMEOUT = 60 * 60 * 1000; // Timeout in ms (1 hour)

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { generateOTP, sendOTP } = require('../../controllers/users/optService');
const router = express.Router();

// Store OTP data in-memory (for simplicity; replace with a database in production)
let otpStore = {};
let otpRequestCount = {};  // Used to track OTP requests per phone number for rate limiting


// Route to send OTP
router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).send('Phone number is required');
  }

  // Check rate limiting (if the number of requests exceeds the limit)
  const currentTime = Date.now();
  const requests = otpRequestCount[phoneNumber] || [];

  // Remove expired requests
  otpRequestCount[phoneNumber] = requests.filter(requestTime => currentTime - requestTime < OTP_REQUEST_TIMEOUT);

  // Check if the phone number has exceeded the OTP request limit
  if (otpRequestCount[phoneNumber].length >= OTP_REQUEST_LIMIT) {
    return res.status(429).send('Too many OTP requests. Please try again later.');
  }

  try {
    // Generate OTP and a unique OTP session ID
    const otp = generateOTP(); // Generate OTP
    const otpId = uuidv4(); // Unique ID for OTP session
    
    // Log the generated OTP
    console.log('Generated OTP:', otp);

    // Store OTP in memory with session data
    otpStore[otpId] = {
      phoneNumber,
      otp,
      createdAt: Date.now(),
    };

    // Log the entire otpStore for debugging
    console.log('Stored OTP Data:', JSON.stringify(otpStore, null, 2));

    // Log the OTP request time for rate limiting
    otpRequestCount[phoneNumber].push(currentTime);

    // Call function to send OTP (this is assumed to send the OTP via SMS or email)
    const response = await sendOTP(phoneNumber, otp);

    // Send the OTP response back to the client (omit OTP for security in real app)
    res.status(200).send({
      message: 'OTP sent successfully',
      otpId, // Send OTP session ID for verification later
      response, // Response from the SMS service (optional)
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).send({ error: 'Failed to send OTP', details: error.message });
  }
});




// Route to verify OTP
router.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp, otpId } = req.body;

  if (!phoneNumber || !otp || !otpId) {
    return res.status(400).json({ message: 'Phone number, OTP, and OTP ID are required' });
  }

  // Fetch OTP data from memory or database
  const otpData = otpStore[otpId];

  console.log('Fetched OTP Data:', otpData); // Log the OTP data to check if it's stored correctly

  if (!otpData) {
    return res.status(400).json({ message: 'OTP session not found or expired' });
  }

  // Debugging: Log the OTP and phone number being verified
  console.log('Verifying OTP:', otp);
  console.log('OTP from OTP data:', otpData.otp);
  console.log('Phone number from OTP data:', otpData.phoneNumber);
  console.log('Phone number provided by user:', phoneNumber);

  // Ensure both OTPs are compared as numbers (convert incoming OTP to number)
  const isOtpValid = otpData.otp === Number(otp);  // Convert incoming OTP to number
  const isPhoneValid = otpData.phoneNumber === phoneNumber;

  // Check if OTP is expired (e.g., 5 minutes expiration)
  const isExpired = Date.now() - otpData.createdAt > 5 * 60 * 1000; // 5 minutes in ms

  if (isExpired) {
    return res.status(400).json({ message: 'OTP expired' });
  }

  if (!isOtpValid || !isPhoneValid) {
    return res.status(400).json({ message: 'Invalid OTP or phone number' });
  }

  // OTP is verified successfully
  return res.status(200).json({
    success: true,
    message: 'OTP verified successfully!',
  });
});



module.exports = router;
