from .product_seo import ProductSEAgent
from .receipt_ocr import ReceiptOCRAgent
from .caption_hashtag import CaptionHashtagAgent

class AgentRegistry:
    """A registry for all available agents."""

    def __init__(self):
        self._agents = {
            "product_seo": ProductSEAgent(),
            "receipt_ocr": ReceiptOCRAgent(),
            "caption_hashtag": CaptionHashtagAgent(),
        }

    def get_agent(self, name: str):
        """Returns an agent by name."""
        return self._agents.get(name)

agent_registry = AgentRegistry()
