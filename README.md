# Secret Detector Project

## Overview
This project is a Chrome extension and backend service designed to capture PDF file uploads and inspect them for potential secrets or sensitive information.

## Features
- PDF file upload detection in Chrome
- Backend service for PDF text extraction
- Secret detection using Prompt Security API

## Prerequisites
- Python 3.8+
- Chrome Browser
- Prompt Security API credentials

## Installation and Setup

### Backend Service
1. Clone the repository

2. Enter backend directory
```bash
cd secret-detector/backend-service
```

3. Create a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate
```

4. Install dependencies
```bash
pip install -r requirements.txt
```

5. Set up environment variables
```bash
export PROMPT_SECURITY_APP_ID=your_app_id_here
```

6. Run the backend service
```bash
python app.py
```

### Chrome Extension
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `chrome-extension` directory

## Usage
1. Open ChatGPT or any other supported AI web platform.
2. Upload a PDF file using either:
    - A file input
    - Or by drag-and-dropping it into the page.
3. The Chrome extension will automatically:
    - Intercept the upload
    - Extract and inspect the file content via the backend
4. If potential secrets are found:
    - A red popup alert will be displayed in the top-right corner.

## Components
- Chrome Extension: Captures PDF file uploads
- Backend File Inspection Service: Analyzes files for potential secrets in PDF files

## Project Structure
```
secret-detector/
│
├── chrome-extension/
│   ├── background.js
│   ├── constants.js
│   ├── content.js
│   └── manifest.json
│
├── backend-service/
│   ├── app.py
│   ├── config.py
│   ├── inspector.py
│   ├── logger.py
│   ├── requirenments.txt
│   └── utils.py
│
├── .gitignore
└── README.md
```

## Limitations
- ✅ Currently supports only PDF files
- 🔐 Relies on Prompt Security API for secret detection
- 🌐 Works only on specific web platforms that allow access to file uploads
- 🧩 Requires manual loading as an unpacked extension in Chrome
- ⚠️ On ChatGPT, detection does not work for PDFs uploaded via the file input button due to platform            restrictions, only drag-and-drop is supported.

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
