import google.generativeai as genai
from ..config import settings

genai.configure(api_key=settings.GOOGLE_API_KEY)

def get_gemini_model():
    """Returns the Gemini Pro Vision model."""
    return genai.GenerativeModel('gemini-pro-vision')
