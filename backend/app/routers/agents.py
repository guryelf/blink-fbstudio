from fastapi import APIRouter, UploadFile, File, HTTPException
from ..schemas import ProcessingResult
from ..services.storage import upload_file
from ..agents.registry import agent_registry

router = APIRouter()

@router.post("/process/{agent_name}", response_model=ProcessingResult)
def process_agent(agent_name: str, file: UploadFile = File(...)):
    """
    Process an image with a specified agent.
    """
    agent = agent_registry.get_agent(agent_name)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    try:
        # Upload the file and get the public URL
        public_url = upload_file(file.file, file.filename)

        # Execute the agent
        result = agent.execute(public_url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
