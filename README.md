# Secret Detector Project

## Overview
This project is a Chrome extension and backend service designed to capture PDF file uploads and inspect them for potential secrets or sensitive information.

## Features
- PDF file upload detection in Chrome
- Backend service for PDF text extraction
- Secret detection using Prompt Security API
- Optional Dockerized backend for easy deployment

## Prerequisites
- Python 3.8+ or Docker
- Chrome Browser
- Prompt Security API credentials

## Installation and Setup

### Backend Service

#### Option A: Using Docker
```bash
git clone https://github.com/IliyaMikhaelovitch/secret-detector.git
cd secret-detector
docker-compose up --build
```
> 🛠 Make sure Docker Desktop is installed and running.
> If you get a permission error like `permission denied` or `open ~/.docker/buildx/current: permission denied`, run:
```bash
sudo chown -R $(whoami) ~/.docker
chmod -R u+rw ~/.docker
```
> Then restart Docker Desktop and retry.

#### Option B: Run locally (no Docker)
```bash
git clone https://github.com/IliyaMikhaelovitch/secret-detector.git
cd secret-detector/backend-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Chrome Extension
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `chrome-extension` directory

## Usage
1. Open [ChatGPT](https://chat.openai.com) or another supported web AI platform.
2. **Drag and drop** a PDF file into the page. On ChatGPT, file input buttons are not supported due to platform limitations — only drag-and-drop works. On other platforms, both file inputs and drag-and-drop works as expected
3. The Chrome extension will automatically:
   - Detect the PDF
   - Send it to the backend for scanning
4. If secrets are detected:
   - A red alert will appear in the top-right corner
   - Results are also logged to the browser console

## Components
- **Chrome Extension** – Intercepts drag-and-drop and input PDF uploads and sends them for scanning
- **Backend Service** – Parses PDF, extracts text, and sends it to Prompt Security for detection

## Project Structure
```
secret-detector/
├── chrome-extension/
│   ├── background.js
│   ├── constants.js
│   ├── content.js
│   └── manifest.json
│
├── backend-service/
│   ├── app.py
│   ├── config.py
│   ├── Dockerfile
│   ├── inspector.py
│   ├── logger.py
│   ├── requirements.txt
│   └── utils.py
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Limitations
- Currently supports only PDF files
- Relies on Prompt Security API for secret detection
- Requires manual loading as an unpacked extension in Chrome
- On ChatGPT, file input buttons are not supported due to platform limitations — only drag-and-drop works. On other platforms, both file inputs and drag-and-drop may work as expected
- Slight delay while scanning files (sub-second, longer for large PDFs or network latency)
- May trigger false positives/negatives — rely on Prompt Security accuracy
- Currently tested and supported on:
  - https://chatgpt.com
  - https://www.perplexity.ai
  - https://claude.ai/chat/
- More platforms can be added by updating the manifest file

## Production Considerations
- Deploy extension via Chrome Enterprise or private Web Store listing
- Consider ECS/EKS backend deployment with a message queue for scalable infrastructure
- Host backend on internal server with TLS, JWT or mutual TLS authentication
- Manage API secrets securely in server-side env variables (never expose to frontend)
- Ensure compliance with data protection laws if using external APIs (e.g., Prompt Security)
- Add unit tests, integration tests, and automation to validate functionality with more files and secret types
- Enhance popup UX by including details from the Prompt Security response to help users understand what was flagged and why

## Performance & Future Improvements
- Add caching for previously scanned files (e.g., SHA-256 hash match)
- Support streaming/partial parsing for large files
- Extend to additional file formats or even image scans with OCR
- Add user-friendly UI (progress indicator, option to view or redact secrets)
- Consider fallback detection if Prompt Security API fails (e.g., regex-based local scan)