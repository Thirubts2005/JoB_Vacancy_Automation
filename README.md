# AI-Powered Job Vacancy Automation System

This is a simple, end-to-end automation system that receives raw job vacancy text via Telegram, extracts structured information using local AI (Ollama + Mistral), stores it in a PostgreSQL database, and publishes the formatted results to a Telegram Channel and a React frontend.

## Prerequisites
- **Python 3.9+** and `pip`
- **Node.js** and `npm`
- **PostgreSQL** database running
- **Ollama** installed with the `mistral` model downloaded (`ollama run mistral`)
- **Telegram Bot Token** (Create one via BotFather on Telegram)

## 1. Backend Setup (FastAPI + PostgreSQL)

Navigate to the `backend` folder:
```bash
cd backend
```

Create a `.env` file (optional if your postgres URL matches the default):
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
```

Install dependencies and run:
```bash
pip install -r requirements.txt
python main.py
```
> Let it run on `http://localhost:8000`

## 2. Telegram Bot Setup

Navigate to the `telegram_bot` folder:
```bash
cd telegram_bot
```

Create a `.env` file:
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHANNEL_ID=your_channel_id_here
BACKEND_URL=http://localhost:8000
```
> Note: If you don't have a channel ID, just leave it as is. The bot will reply with a preview format instead.

Install dependencies and run:
```bash
pip install -r requirements.txt
python bot.py
```

## 3. Frontend Setup (React + Tailwind)

Navigate to the `frontend` folder:
```bash
cd frontend
```

Install dependencies and run:
```bash
npm install
npm run dev
```

## How to Test
1. Send a paragraph of text to your Telegram Bot (e.g., "Coal India Limited (CIL) Recruitment 2026 is hiring Management Trainees...").
2. The bot passes it to the Backend.
3. Backend extracts details using local Ollama.
4. Data is saved in PostgreSQL and formatted back to the Telegram channel.
5. Visit the locally hosted React website (`http://localhost:5173`) to view dynamic updates with beautiful UI.
