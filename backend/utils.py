from transformers import pipeline

model_name = "deepset/roberta-base-squad2"

# Use pretrained model for question answering
model = pipeline("question-answering", model=model_name, tokenizer=model_name)
