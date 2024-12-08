from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils import model


class QuestionRequest(BaseModel):
    context: str
    questions: list[str]


app = FastAPI()

origins = ["http://localhost", "chrome-extension://fojiaognpndlhaiefpjmgiconmipoflj"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {"Hello": "World"}


@app.post("/predict-answers")
async def predict_answer(question_request: QuestionRequest):
    context = question_request.context
    questions = question_request.questions
    answers = []
    for question in questions:
        ans = model(question=question, context=context)
        answers.append(ans["answer"])
    return {"answers": answers}
