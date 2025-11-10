from fastapi import FastAPI
from .routers import agents

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(agents.router)
