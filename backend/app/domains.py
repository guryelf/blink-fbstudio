from pydantic import BaseModel
from typing import List

class Domain(BaseModel):
    id: str
    name: str
    description: str
    endpoint: str

def get_domains() -> List[Domain]:
    # In a real app, this could be loaded from a database or a configuration file.
    return [
        Domain(
            id="product_seo",
            name="Product SEO",
            description="Generate SEO-friendly product descriptions and keywords.",
            endpoint="product_seo",
        ),
        Domain(
            id="receipt_ocr",
            name="Receipt OCR",
            description="Extract information from receipts using OCR.",
            endpoint="receipt_ocr",
        ),
        Domain(
            id="caption_hashtag",
            name="Caption & Hashtag",
            description="Generate engaging captions and relevant hashtags for your images.",
            endpoint="caption_hashtag",
        ),
    ]
