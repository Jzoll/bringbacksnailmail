from pydantic import BaseModel


class Prompt(BaseModel):
    id: str
    type: str  # "writing" | "drawing"
    text: str
    active: bool = True
