from pydantic import BaseModel
from typing import List, Dict, Any

class ProcessingResult(BaseModel):
    summary: str
    structured: Dict[str, Any]
    artifacts: Dict[str, Any]
