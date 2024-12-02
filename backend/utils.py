import torch
from transformers import pipeline

model_name = "deepset/roberta-base-squad2"
device = "cuda" if torch.cuda.is_available() else "cpu"

# Use pretrained model for question answering
model = pipeline(
    "question-answering", model=model_name, tokenizer=model_name, device=device
)
