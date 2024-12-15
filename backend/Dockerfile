FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

WORKDIR /app

COPY pyproject.toml uv.lock /app

RUN uv sync --frozen --no-dev

ENV PATH="/app/.venv/bin:$PATH"

COPY . /app

EXPOSE 8000

CMD ["fastapi", "run", "app.py", "--port", "8000"]
