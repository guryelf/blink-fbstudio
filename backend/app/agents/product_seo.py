from .base import BaseAgent
from ..schemas import ProcessingResult
from ..services.gemini import get_gemini_model
import json

class ProductSEAgent(BaseAgent):
    """Agent for generating product SEO content."""

    def execute(self, image_url: str) -> ProcessingResult:
        """Generates SEO-friendly product descriptions and keywords."""
        model = get_gemini_model()
        prompt = """
        Analyze the product in the image and generate the following:
        1.  A compelling, SEO-friendly product description.
        2.  A list of relevant keywords.
        3.  A suggested product title.

        Return the result as a JSON object with the following keys:
        - "title"
        - "description"
        - "keywords"
        """
        response = model.generate_content([prompt, {"url": image_url}])
        structured_data = json.loads(response.text)

        return ProcessingResult(
            summary=f"Generated SEO content for product.",
            structured=structured_data,
            artifacts={
                "image_url": image_url
            }
        )
