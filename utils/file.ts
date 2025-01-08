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