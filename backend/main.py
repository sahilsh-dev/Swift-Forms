import torch
from transformers import pipeline

model_name = "deepset/roberta-base-squad2"
device = "cuda" if torch.cuda.is_available() else "cpu"

# Use pretrained model for question answering
model = pipeline(
    "question-answering", model=model_name, tokenizer=model_name, device=device
)

QA_input = {
    "question": "Why is model conversion important?",
    "context": """
        The option to convert models between FARM and transformers 
        gives freedom to the user and let people easily switch between frameworks.
   """,
}
res = model(**QA_input)
