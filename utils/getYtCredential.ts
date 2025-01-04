import { YouTubeCredentialsCapturer } from 'patreon-dl';
import fs from 'fs';
// Note: you should wrap the following logic inside an async
// process, and resolve when the credentials have been saved.

const capturer = new YouTubeCredentialsCapturer();

/**
 * 'pending' event emitted when verification data is ready and waiting
 * for user to carry out the verification process.
 */
capturer.on('pending', (data) => {
  // `data` is an object: { verificationURL: <string>, code: <string> }
  // Use `data` to provide instructions to the user:
  console.log(
    `In a browser, go to the following Verification URL and enter Code:

    - Verification URL: ${data.verificationURL}
    - Code: ${data.code}

    Then wait for this script to complete.`);
});

/**
 * 'capture' event emitted when the user has completed verification and the 
 * credentials have been relayed back to the capturer.
 */
capturer.on('capture', (credentials) => {
  // `credentials` is an object which you need to save to file as JSON string.
  fs.writeFileSync('yt-credentials.json', JSON.stringify(credentials));
  console.log('Credentials saved!');
});

// When you have added the listeners, start the capture process.
capturer.begin();