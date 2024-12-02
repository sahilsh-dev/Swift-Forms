from fastapi import FastAPI
from pydantic import BaseModel
from utils import model


class QuestionRequest(BaseModel):
    context: str
    questions: list[str]


app = FastAPI()


@app.get("/")
async def home():
    return {"Hello": "World"}


@app.post("/predict-answer")
async def predict_answer(question_request: QuestionRequest):
    context = question_request.context
    questions = question_request.questions
    answers = []
    for question in questions:
        ans = model(question=question, context=context)
        answers.append(ans["answer"])
    return {"answers": answers}
