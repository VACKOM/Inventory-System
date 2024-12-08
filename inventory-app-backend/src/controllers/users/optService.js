const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const generateOTP = () => {
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP 
  return otp;
};

const sendOTP = async (phoneNumber, otp) => {
  const apiKey = process.env.MNOTIFY_API_KEY;
console.log(otp);
  const response = await axios.post('https://apps.mnotify.net/smsapi?', {
    key: apiKey,
    to: phoneNumber,
    msg: `Your OTP for asset collection: ${otp}`,
    sender_id: 'Stores' // Customize this sender nameOTP message samples 
    
  });

  return response.data;
};


module.exports = { generateOTP, sendOTP };
