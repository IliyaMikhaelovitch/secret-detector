import { BACKEND_SERVICE_URL, PROMPT_SECURITY_APP_ID } from './constants.js';

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'PDF_UPLOAD_DETECTED') {
    processPDFUpload(message.filename, message.fileContent);
  }
});

async function processPDFUpload(filename, fileContent) {
  if (!filename || !filename.toLowerCase().endsWith('.pdf')) {
    console.error(`[SecretDetector] Invalid filename: ${filename}`);
    return;
  }

  if (!fileContent || !Array.isArray(fileContent)) {
    console.error(`[SecretDetector] Invalid or missing file content.`);
    return;
  }

  try {
    const buffer = new Uint8Array(fileContent);
    const response = await fetch(BACKEND_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/pdf',
        'X-Filename': filename,
        'APP-ID': PROMPT_SECURITY_APP_ID
      },
      body: buffer
    });

    const result = await response.json();
    if (result.status === 'success' && result.result?.action === 'block') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'SHOW_SECRET_ALERT',
          filename
        });
      });
    }
  } catch (error) {
    console.error(`[SecretDetector] Error processing PDF: ${error}`);
  }
}