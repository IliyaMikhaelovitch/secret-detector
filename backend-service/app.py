from flask import Flask, request, jsonify
from flask_cors import CORS
import tempfile
import os
import signal
import sys

from logger import logger
from config import PROMPT_SECURITY_APP_ID
from utils import extract_text_from_pdf
from inspector import inspect_text_for_secrets

app = Flask(__name__)
CORS(app)


@app.route('/inspect-pdf', methods=['POST'])
def inspect_pdf():
    try:
        pdf_content = request.get_data()
        if not pdf_content:
            return jsonify({'status': 'error', 'reason': 'Empty PDF content'}), 400

        filename = request.headers.get('X-Filename', 'unknown.pdf')
        if not filename or not filename.lower().endswith('.pdf'):
            return jsonify({'status': 'error', 'reason': 'Invalid or missing filename'}), 400

        logger.info(f"Received PDF for inspection: {filename}")

        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            temp_file.write(pdf_content)
            temp_file_path = temp_file.name

        extracted_text = extract_text_from_pdf(temp_file_path)
        os.unlink(temp_file_path)

        if not extracted_text.strip():
            logger.info(f"No extractable text found in {filename}.")
            return jsonify({
                'status': 'success',
                'result': {
                    'passed': True,
                    'reason': 'No extractable text'
                }
            })

        inspection_result = inspect_text_for_secrets(extracted_text)
        if not isinstance(inspection_result, dict):
            logger.error(f"Invalid response from inspector service: {inspection_result}")
            return jsonify({'status': 'error', 'reason': 'Invalid inspector response'}), 500

        logger.info(f"Inspection result for {filename}: {inspection_result}")
        return jsonify(inspection_result)

    except Exception as e:
        logger.exception("Unexpected error during PDF inspection")
        return jsonify({'status': 'error', 'reason': str(e)}), 500


def cleanup(signal, frame):
    logger.info("Shutting down server...")
    sys.exit(0)

signal.signal(signal.SIGINT, cleanup)
signal.signal(signal.SIGTERM, cleanup)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=False)