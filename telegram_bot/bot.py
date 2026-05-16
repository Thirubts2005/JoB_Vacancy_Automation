import os
import requests
import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "YOUR_TELEGRAM_BOT_TOKEN")
CHANNEL_ID = os.getenv("TELEGRAM_CHANNEL_ID", "YOUR_TELEGRAM_CHANNEL_ID")
BACKEND_URL = os.getenv("BACKEND_URL", "YOUR_BACKEND_URL")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Hello Admin! Send me a job vacancy paragraph and I will extract the details, save to database, and post it to our channel."
    )

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text
    await update.message.reply_text("Processing job vacancy with Ollama...")

    try:
        # 1. Send to /extract
        extract_response = requests.post(f"{BACKEND_URL}/extract", json={"text": text})
        extract_response.raise_for_status()
        job_data = extract_response.json()
        
        # 2. Save to /jobs
        save_response = requests.post(f"{BACKEND_URL}/jobs", json=job_data)
        save_response.raise_for_status()
        saved_job = save_response.json()

        # 3. Format message for Telegram Channel
        formatted_message = f"""🏢 Company: {saved_job['company']}
📌 Role: {saved_job['role']}
🎓 Qualification: {saved_job['qualification']}
🆕 Experience: {saved_job['experience']}
📊 Vacancies: {saved_job['vacancies']}
📅 Last Date: {saved_job['last_date']}
📍 Location: {saved_job['location']}
"""
        
        # 4. Post to Telegram Channel
        if CHANNEL_ID:
            await context.bot.send_message(chat_id=CHANNEL_ID, text=formatted_message)
            await update.message.reply_text("Successfully processed and posted to channel!")
        else:
            await update.message.reply_text(f"Successfully processed! Here is the preview:\n\n{formatted_message}\n\n(Configure TELEGRAM_CHANNEL_ID to post to a channel automatically)")

    except Exception as e:
        await update.message.reply_text(f"Error processing job vacancy: {str(e)}")

def main():
    if BOT_TOKEN == "YOUR_BOT_TOKEN_HERE":
        print("Please set TELEGRAM_BOT_TOKEN in your environment or .env file.")
        return

    application = Application.builder().token(BOT_TOKEN).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    print("Bot is running...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
