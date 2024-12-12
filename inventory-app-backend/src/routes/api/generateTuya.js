import axios from 'axios';
import crypto from 'crypto';

// Tuya API details
const TUYA_URL = 'https://openapi.tuyaeu.com';
const CLIENT_ID = 'ehgrw7ud7mqq8qvs3343';
const SECRET = 'f7079ff731724c31a84804b842845f4b';
const DEVICE_ID = '37867803c45bbe73322f';

const config = {
    host: TUYA_URL,
    accessKey: CLIENT_ID,
    secretKey: SECRET,
    deviceId: DEVICE_ID,
};

const httpClient = axios.create({
    baseURL: config.host,
    timeout: 5000,
});

let token = '';

async function encryptStr(str, secret) {
    return crypto.createHmac('sha256', secret).update(str, 'utf8').digest('hex').toUpperCase();
}

async function getToken() {
    const timestamp = Date.now().toString();
    const signUrl = '/v1.0/token?grant_type=1'; 
    const method = 'GET';
    const contentHash = crypto.createHash('sha256').update('').digest('hex');
    const stringToSign = [method, contentHash, '', signUrl].join('\n');
    const signStr = config.accessKey + timestamp + stringToSign;
    const sign = await encryptStr(signStr, config.secretKey);

    const headers = {
        t: timestamp,
        sign_method: 'HMAC-SHA256',
        client_id: config.accessKey,
        sign: sign,
    };

    console.log('Token Request Headers:', headers);

    try {
        const { data: login } = await httpClient.get('/v1.0/token?grant_type=1', { headers });
        if (!login || !login.success) {
            throw new Error(`Failed to fetch token: ${login.msg}`);
        }
        // console.log('Token Response:', login);
        return (token = login.result.access_token);
    } catch (error) {
        console.error('Error fetching token:', error.response?.data || error.message);
        throw error;
    }
}

async function getDynamicPassword() {
    const timestamp = Date.now().toString();
    const method = 'GET';
    const requestUrl = `/v1.0/devices/${config.deviceId}/door-lock/dynamic-password`;
    const contentHash = crypto.createHash('sha256').update('').digest('hex');
    const stringToSign = [method, contentHash, '', requestUrl].join('\n');
    const signStr = config.accessKey + token + timestamp + stringToSign;
    const sign = await encryptStr(signStr, config.secretKey);

    const headers = {
        t: timestamp,
        sign_method: 'HMAC-SHA256',
        client_id: config.accessKey,
        sign: sign,
        access_token: token,
    };

    // console.log('Dynamic Password Request Headers:', headers);

    try {
        const { data: response } = await httpClient.get(requestUrl, { headers });
        if (!response || !response.success) {
            throw new Error(`Failed to fetch dynamic password: ${response.msg}`);
        }
        console.log('Dynamic Password Response:', response.result?.dynamic_password);
        const code = response.result?.dynamic_password
        return code;
    } catch (error) {
        console.error('Error fetching dynamic password:', error.response?.data || error.message);
        throw error;
    }
}

export async function generatedPassword(){
    try {
        if (!token) {
            console.log('Fetching access token...');
            token = await getToken();
        }

        console.log('Fetching dynamic password...');
        return await getDynamicPassword();

    } catch (error) {
        console.error('Error fetching dynamic password:', error.message);
    }
};
