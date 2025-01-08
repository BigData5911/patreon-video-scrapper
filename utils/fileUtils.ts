import fs from 'fs';
import path from 'path';

export const saveJsonToFile = (data: any, filename: string) => {
    // Convert the object to a JSON string with an indentation of 4 spaces
    const jsonData = JSON.stringify(data, null, 4)

    // Write the JSON content to the file
    fs.writeFile(filename, jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log(`JSON file has been saved at ${filename}`);
        }
    });
}

// Function to log errors to a file
export const logErrorToFile = (errorMessage: string) => {
    const logFilePath = path.join('error.log');
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${errorMessage}\n`;

    // Append the error message to the error.log file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to error.log:', err);
        }
    });
};