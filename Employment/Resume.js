const { google } = require('googleapis');

// Import the Google Sheets API library

// Set up the Google Sheets API credentials
const auth = new google.auth.GoogleAuth({
    // Add your credentials here
    // ...
});

// Define the Google Sheet ID and range
const sheetId = '1EwgoTxjnV6XJR_XJEwvCfA6RFpP-nqTUYaWAQ2pb_zw';
const range = 'School layout!E1'; // Change this to the desired cell range

// Function to get the cell value and insert it into the span element
async function getCellValueAndInsert() {
    try {
        // Create a new instance of the Google Sheets API
        const sheets = google.sheets({ version: 'v4', auth });

        // Retrieve the cell value from the Google Sheet
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: range,
        });

        // Get the cell value from the response
        const cellValue = response.data.values[0][0];

        // Insert the cell value into the span element with the id "Overall"
        const overallSpan = document.getElementById('Overall');
        overallSpan.textContent = cellValue;

        console.log('Cell value inserted successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to get the cell value and insert it
getCellValueAndInsert();