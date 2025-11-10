from .base import BaseAgent
from ..schemas import ProcessingResult
from ..services.gemini import get_gemini_model
import json

class CaptionHashtagAgent(BaseAgent):
    """Agent for generating captions and hashtags."""

    def execute(self, image_url: str) -> ProcessingResult:
        """Generates engaging captions and relevant hashtags for an image."""
        model = get_gemini_model()
        prompt = """
        Analyze the image and generate the following:
        1.  An engaging caption for social media.
        2.  A list of relevant hashtags.

        Return the result as a JSON object with the following keys:
        - "caption"
        - "hashtags"
        """
        response = model.generate_content([prompt, {"url": image_url}])
        structured_data = json.loads(response.text)

        return ProcessingResult(
            summary=f"Generated caption and hashtags.",
            structured=structured_data,
            artifacts={
                "image_url": image_url
            }
        )
