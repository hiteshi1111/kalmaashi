const { google } = require('googleapis');
const credentials = require('../credentials.json');

const service = {};

service.subscribeToNewsletter = subscribeToNewsletter;

async function subscribeToNewsletter(email) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const spreadsheetId = '1X2W0RqT4vyir0O8nhom5fJhmy564q_72be-hC0ik1yo'; // Replace with your Google Sheets spreadsheet ID
        const range = 'kalmaashi-newsletter'; // Replace with your desired range

        // Get current data in the range
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const existingValues = response.data.values || [];

        // Check if the email already exists in the existing values
        const emailExists = existingValues.some(row => row.includes(email));
        
        // If email already exists, return without adding it again
        if (emailExists) {
            // console.log('Email already exists in Google Sheets');
            return { message: 'Email already subscribed' };
        }

        // Prepare new values with "Emails" header
        const newValues = [
            ...(existingValues.length > 0 ? [] : [['Emails']]), // Add the header only if it doesn't exist
            ...existingValues, // Add existing values
            [email], // Add the new email address
        ];

        // Update the range with new values
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            requestBody: {
                values: newValues, // Use the new values
            },
        });

        // console.log('Email added to Google Sheets');
        return { message: 'Subscription successful' };
    } catch (error) {
        // console.error('Error subscribing to newsletter:', error);
        return Promise.reject({ error: 'Something went wrong.' });
    }
}

module.exports = service;






