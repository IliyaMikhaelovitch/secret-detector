# Secret Detector Project

## Overview
This project is a Chrome extension and backend service designed to capture PDF file uploads and inspect them for potential secrets or sensitive information.

## Features
- PDF file upload detection in Chrome
- Backend service for PDF text extraction
- Secret detection using Prompt Security API
- Comprehensive logging mechanism

## Prerequisites
- Python 3.8+
- Chrome Browser
- Prompt Security API credentials

## Installation and Setup

### Backend Service
1. Clone the repository
2. Create a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Set up environment variables
```bash
export PROMPT_SECURITY_APP_ID=your_app_id_here
```

5. Run the backend service
```bash
python app.py
```

### Chrome Extension
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `chrome-extension` directory

## Usage
1. Navigate to ChatGPT or supported web AI sites
2. Upload a PDF file
3. The extension will automatically detect and process the file
4. Check the console or notifications for potential secret detections

## Components
- Chrome Extension: Captures PDF file uploads
- Backend File Inspection Service: Analyzes files for potential secrets
- Logging System: Records inspection results

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
- Currently supports only PDF files
- Relies on Prompt Security API for secret detection
- Limited to specific web platforms
- Requires manual extension loading in Chrome

## Future Improvements
- Support for more file types
- Enhanced secret detection mechanisms
- Automated extension deployment
- More robust error handling
- Performance optimizations for large files

## Security Considerations
- Ensure API credentials are kept confidential
- Implement additional encryption for file transfers
- Add user authentication for the backend service

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
[Specify your license here]