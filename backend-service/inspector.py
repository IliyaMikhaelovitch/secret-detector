import requests
from config import PROMPT_SECURITY_URL, PROMPT_SECURITY_APP_ID
from logger import logger

def inspect_text_for_secrets(text):
    if not isinstance(text, str) or not text.strip():
        logger.warning("inspect_text_for_secrets received invalid text input")
        return {'status': 'error', 'reason': 'Invalid text input'}

    try:
        response = requests.post(
            PROMPT_SECURITY_URL,
            headers={
                'APP-ID': PROMPT_SECURITY_APP_ID,
                'Content-Type': 'application/json'
            },
            json={'prompt': text}
        )
        return response.json()
    except Exception as e:
        logger.error(f"Prompt Security API request failed: {e}")
        return {'status': 'error', 'reason': str(e)}