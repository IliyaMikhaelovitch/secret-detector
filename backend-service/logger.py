import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='pdf_inspection.log'
)

logger = logging.getLogger("SecretDetector")