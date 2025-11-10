from abc import ABC, abstractmethod
from ..schemas import ProcessingResult

class BaseAgent(ABC):
    """Abstract base class for all agents."""

    @abstractmethod
    def execute(self, image_url: str) -> ProcessingResult:
        """Executes the agent's logic."""
        pass
