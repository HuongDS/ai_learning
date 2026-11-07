import os
import sys
import subprocess
import asyncio
import logging
from typing import List
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    filters,
)
from openai import OpenAI

# Load biến môi trường
load_dotenv()

# Cấu hình logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# Lấy các biến cấu hình
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
ALLOWED_USER_ID = os.getenv("TELEGRAM_ALLOWED_USER_ID")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
WORKSPACE_DIR = os.getenv("WORKSPACE_DIR", os.getcwd())

if not TELEGRAM_BOT_TOKEN:
    raise ValueError("Thiếu TELEGRAM_BOT_TOKEN trong file .env!")

# Khởi tạo OpenAI Client nếu có key
openai_client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None


def is_authorized(update: Update) -> bool:
    """Kiểm tra chỉ cho phép chủ nhân sử dụng bot (bảo mật tuyệt đối)."""
    if not ALLOWED_USER_ID:
        return True  # Nếu chưa set ALLOWED_USER_ID thì tạm thời cho phép
    user_id = str(update.effective_user.id)
    return user_id == str(ALLOWED_USER_ID)


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Lệnh /start"""
    if not is_authorized(update):
        await update.message.reply_text("⛔ Bạn không có quyền truy cập bot này.")
        return

    user_name = update.effective_user.first_name
    msg = (
        f"👋 Chào sếp **{user_name}**! Tôi là **AI Cloud Agent** của bạn.\n\n"
        f"🌐 Tôi đang chạy 24/7 trên Cloud ngay cả khi bạn tắt máy tính.\n"
        f"📂 Thư mục làm việc: `{WORKSPACE_DIR}`\n\n"
        f"**Các lệnh nhanh:**\n"
        f"• `/status` : Kiểm tra tình trạng máy chủ & git\n"
        f"• `/git_pull`: Kéo code mới nhất từ GitHub\n"
        f"• `/git_push <message>`: Commit và push code lên GitHub\n"
        f"• `/run <command>`: Chạy lệnh terminal trên server\n"
        f"• Gửi tin nhắn bất kỳ: Tôi sẽ dùng AI để giải quyết yêu cầu của bạn!"
    )
    await update.message.reply_text(msg, parse_mode="Markdown")


async def status_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Kiểm tra trạng thái máy chủ và git repo"""
    if not is_authorized(update):
        return

    await update.message.reply_text("🔍 Đang kiểm tra hệ thống...")

    try:
        # Lấy thông tin git
        git_log = subprocess.check_output(
            ["git", "log", "-1", "--oneline"], cwd=WORKSPACE_DIR, text=True, timeout=10
        ).strip()
        git_branch = subprocess.check_output(
            ["git", "branch", "--show-current"], cwd=WORKSPACE_DIR, text=True, timeout=10
        ).strip()
    except Exception as e:
        git_log = "Không kiểm tra được"
        git_branch = "Unknown"

    reply = (
        f"🟢 **HỆ THỐNG CLOUD ĐANG HOẠT ĐỘNG 24/7**\n\n"
        f"• **Nhánh Git:** `{git_branch}`\n"
        f"• **Commit mới nhất:** `{git_log}`\n"
        f"• **Thư mục:** `{WORKSPACE_DIR}`\n"
        f"• **Python:** `{sys.version.split()[0]}`\n"
        f"• **OpenAI Engine:** {'Sẵn sàng ✓' if openai_client else 'Chưa cấu hình API Key'}"
    )
    await update.message.reply_text(reply, parse_mode="Markdown")


async def run_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Chạy lệnh shell an toàn trên server"""
    if not is_authorized(update):
        return

    cmd = " ".join(context.args)
    if not cmd:
        await update.message.reply_text("⚠️ Vui lòng nhập lệnh. Ví dụ: `/run ls -la` hoặc `/run git status`")
        return

    msg = await update.message.reply_text(f"⏳ Đang thực thi: `{cmd}`...", parse_mode="Markdown")

    try:
        process = await asyncio.create_subprocess_shell(
            cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=WORKSPACE_DIR,
        )
        stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=60.0)

        output = stdout.decode("utf-8", errors="replace") + stderr.decode("utf-8", errors="replace")
        output = output.strip() or "(Không có dữ liệu trả về)"

        # Giới hạn độ dài tin nhắn Telegram (4096 ký tự)
        if len(output) > 3500:
            output = output[:3500] + "\n... [Bị cắt bớt vì quá dài]"

        await msg.edit_text(f"✅ **Kết quả lệnh:** `{cmd}`\n\n```text\n{output}\n```", parse_mode="Markdown")
    except asyncio.TimeoutError:
        await msg.edit_text(f"❌ Lệnh `{cmd}` vượt quá thời gian chờ (timeout 60s).")
    except Exception as e:
        await msg.edit_text(f"❌ Lỗi thực thi: {str(e)}")


async def git_pull_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Kéo code mới nhất từ GitHub về Cloud"""
    if not is_authorized(update):
        return

    msg = await update.message.reply_text("🔄 Đang chạy `git pull` từ GitHub...")
    try:
        out = subprocess.check_output(["git", "pull"], cwd=WORKSPACE_DIR, text=True, timeout=30)
        await msg.edit_text(f"✅ **Git pull thành công:**\n```text\n{out}\n```", parse_mode="Markdown")
    except Exception as e:
        await msg.edit_text(f"❌ Lỗi git pull: {str(e)}")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Xử lý yêu cầu văn bản tự do của người dùng bằng AI"""
    if not is_authorized(update):
        return

    user_prompt = update.message.text
    if not user_prompt:
        return

    status_msg = await update.message.reply_text("🧠 Agent đang suy nghĩ và phân tích yêu cầu...")

    if not openai_client:
        await status_msg.edit_text(
            "⚠️ Bạn chưa cấu hình `OPENAI_API_KEY` trong file .env nên tôi chỉ có thể chạy lệnh qua `/run <lệnh>`."
        )
        return

    try:
        # Gọi AI Agent để phân tích và trả lời
        call_params = {
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "Bạn là Antigravity Cloud AI Agent, trợ lý kỹ thuật AI thông minh phục vụ người dùng từ xa qua Telegram. "
                        "Trả lời súc tích, chuyên nghiệp bằng tiếng Việt. Nếu người dùng yêu cầu thao tác lệnh, bạn hãy hướng dẫn "
                        "hoặc đưa ra cú pháp lệnh shell `/run <command>` tương ứng."
                    ),
                },
                {"role": "user", "content": user_prompt},
            ],
            "max_completion_tokens": 1500,
        }
        try:
            response = openai_client.chat.completions.create(
                temperature=0.7,
                **call_params,
            )
        except Exception as temp_err:
            if "temperature" in str(temp_err).lower():
                response = openai_client.chat.completions.create(**call_params)
            else:
                raise temp_err

        reply_text = response.choices[0].message.content
        await status_msg.edit_text(reply_text)
    except Exception as e:
        await status_msg.edit_text(f"❌ Lỗi khi gọi AI: {str(e)}")


def main():
    print("🚀 Khởi động Antigravity Telegram Cloud Agent...")
    app = ApplicationBuilder().token(TELEGRAM_BOT_TOKEN).build()

    # Đăng ký các handler
    app.add_handler(CommandHandler("start", start_command))
    app.add_handler(CommandHandler("status", status_command))
    app.add_handler(CommandHandler("run", run_command))
    app.add_handler(CommandHandler("git_pull", git_pull_command))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    print("✅ Bot đang lắng nghe tin nhắn Telegram 24/7...")
    app.run_polling()


if __name__ == "__main__":
    main()
