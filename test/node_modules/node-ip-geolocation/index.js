import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


// Replace with your API key
const API_KEY = process.env.GEO_LOCATION_KEY || "7c32b5ae66de42a490b86b8bd1dcc0f5";
const BASE_URL = 'https://api.ipgeolocation.io/ipgeo';

/**
 * Fetches the public IP address of the user.
 * @returns {Promise<string|null>} The public IP address or an error object if an error occurs.
 */
export async function fetchPublicIP() {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        return {
            error: true,
            message: 'Failed to fetch public IP address.',
            details: error.message,
        };
    }
}

/**
 * Fetches geolocation data for the given IP address.
 * @param {string} ipAddress - The IP address to fetch geolocation for.
 * @returns {Promise<object>} The geolocation data or an error object if an error occurs.
 */
export async function userGeoLocationForPublicIP(ipAddress) {
    if (!ipAddress) {
        return {
            error: true,
            message: 'IP address is required for geolocation lookup.',
        };
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apiKey: API_KEY,
                ip: ipAddress,
            },
        });

        return response.data;
    } catch (error) {
        return {
            error: true,
            message: 'Failed to fetch geolocation data.',
            details: error.response?.data || error.message,
        };
    }
}

/**
 * Fetches the geolocation data for the user's public IP address.
 * @returns {Promise<object>} The geolocation data for the public IP or an error object if an error occurs.
 */
export async function getGeolocation() {
    const publicIP = await fetchPublicIP();

    if (publicIP?.error) {
        return publicIP; // Return the error object from fetchPublicIP
    }

    const geolocationData = await userGeoLocationForPublicIP(publicIP);

    if (geolocationData?.error) {
        return geolocationData; // Return the error object from getGeolocation
    }

    return geolocationData;
}

// Uncomment the following line to test when running standalone
// (async () => console.log(await userGeoLocationForPublicIP("103.120.250.252")))();
