import PyPDF2
from logger import logger

def extract_text_from_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            return ''.join([page.extract_text() or '' for page in reader.pages])
    except Exception as e:
        logger.error(f"Failed to extract text from PDF: {e}")
        return ''