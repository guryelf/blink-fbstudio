from .base import BaseAgent
from ..schemas import ProcessingResult
from ..services.gemini import get_gemini_model
import json

class ReceiptOCRAgent(BaseAgent):
    """Agent for extracting information from receipts using OCR."""

    def execute(self, image_url: str) -> ProcessingResult:
        """Extracts information from receipts using OCR."""
        model = get_gemini_model()
        prompt = """
        Analyze the receipt in the image and extract the following information:
        - Vendor name
        - Total amount
        - Date
        - A list of items with their prices

        Return the result as a JSON object with the following keys:
        - "vendor"
        - "total"
        - "date"
        - "items"
        """
        response = model.generate_content([prompt, {"url": image_url}])
        structured_data = json.loads(response.text)

        return ProcessingResult(
            summary=f"Extracted receipt information.",
            structured=structured_data,
            artifacts={
                "image_url": image_url
            }
        )
