FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

WORKDIR /app

ENV HF_HOME=/cache/huggingface
ENV HF_HUB_CACHE=/cache/huggingface/hub

COPY pyproject.toml uv.lock /app

RUN uv sync --frozen --no-dev

ENV PATH="/app/.venv/bin:$PATH"

COPY . /app

EXPOSE 8000

CMD ["fastapi", "run", "app.py", "--port", "8000"]
