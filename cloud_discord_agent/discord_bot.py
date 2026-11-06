import os
import sys
import subprocess
import asyncio
import logging
import discord
from discord.ext import commands
from dotenv import load_dotenv
from openai import OpenAI

# Load biến môi trường
load_dotenv()

# Cấu hình logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# Lấy các biến cấu hình từ .env
DISCORD_BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN")
ALLOWED_USER_ID = os.getenv("DISCORD_ALLOWED_USER_ID")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
WORKSPACE_DIR = os.getenv("WORKSPACE_DIR", os.getcwd())

if not DISCORD_BOT_TOKEN:
    raise ValueError("Thiếu DISCORD_BOT_TOKEN trong file .env!")

# Khởi tạo OpenAI Client nếu có key
openai_client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

# Cấu hình Discord Intents
intents = discord.Intents.default()
intents.message_content = True  # Cần bật Message Content Intent trên Discord Portal

bot = commands.Bot(command_prefix="!", intents=intents)


def is_authorized(user_id: int) -> bool:
    """Kiểm tra quyền truy cập (Chỉ cho phép chủ nhân sử dụng)."""
    if not ALLOWED_USER_ID:
        return True  # Nếu chưa cấu hình thì tạm thời cho phép
    return str(user_id) == str(ALLOWED_USER_ID)


@bot.event
async def on_ready():
    logger.info(f"🟢 Bot đã đăng nhập thành công với tên: {bot.user} (ID: {bot.user.id})")
    print(f"🚀 AI Discord Cloud Agent đang online 24/7 với tên: {bot.user}")
    activity = discord.Activity(type=discord.ActivityType.watching, name="AI Learning System")
    await bot.change_presence(status=discord.Status.online, activity=activity)


@bot.command(name="help_agent")
async def help_command(ctx):
    """Hiển thị hướng dẫn sử dụng"""
    if not is_authorized(ctx.author.id):
        return

    embed = discord.Embed(
        title="🤖 AI CLOUD AGENT — DANH SÁCH LỆNH",
        description="Bot đang chạy trực tiếp trên Cloud 24/7 để hỗ trợ bạn lập trình và quản trị hệ thống.",
        color=0x0056D2,  # Coursera Royal Blue
    )
    embed.add_field(name="!status", value="Kiểm tra trạng thái server Cloud, RAM, Git branch", inline=False)
    embed.add_field(name="!run <lệnh>", value="Chạy lệnh terminal trên server (ví dụ: `!run git status`)", inline=False)
    embed.add_field(name="!pull", value="Kéo mã nguồn mới nhất từ GitHub (`git pull`)", inline=False)
    embed.add_field(name="Nhắn tin tự do", value="Gõ bất kỳ câu hỏi nào trong kênh, AI sẽ phân tích và hỗ trợ bạn!", inline=False)
    embed.set_footer(text="Hệ thống chạy ngầm 24/7 ngay cả khi máy tính tắt.")
    await ctx.send(embed=embed)


@bot.command(name="status")
async def status_command(ctx):
    """Kiểm tra tình trạng server và git repository"""
    if not is_authorized(ctx.author.id):
        return

    loading_msg = await ctx.send("🔍 Đang kiểm tra hệ thống Cloud...")

    try:
        git_log = subprocess.check_output(
            ["git", "log", "-1", "--oneline"], cwd=WORKSPACE_DIR, text=True, timeout=10
        ).strip()
        git_branch = subprocess.check_output(
            ["git", "branch", "--show-current"], cwd=WORKSPACE_DIR, text=True, timeout=10
        ).strip()
    except Exception:
        git_log = "Không kiểm tra được git"
        git_branch = "Unknown"

    embed = discord.Embed(
        title="🟢 HỆ THỐNG CLOUD ĐANG HOẠT ĐỘNG 24/7",
        color=0x16A34A,  # Duolingo Success Green
    )
    embed.add_field(name="Nhánh Git", value=f"`{git_branch}`", inline=True)
    embed.add_field(name="Commit mới nhất", value=f"`{git_log}`", inline=True)
    embed.add_field(name="Thư mục làm việc", value=f"`{WORKSPACE_DIR}`", inline=False)
    embed.add_field(name="Môi trường Python", value=f"`Python {sys.version.split()[0]}`", inline=True)
    embed.add_field(
        name="Trí tuệ AI (OpenAI)",
        value="`Sẵn sàng (GPT-4o) ✓`" if openai_client else "`Chưa cấu hình API Key`",
        inline=True,
    )

    await loading_msg.delete()
    await ctx.send(embed=embed)


@bot.command(name="pull")
async def pull_command(ctx):
    """Kéo mã nguồn mới nhất từ GitHub"""
    if not is_authorized(ctx.author.id):
        return

    loading_msg = await ctx.send("🔄 Đang chạy `git pull` từ GitHub...")
    try:
        out = subprocess.check_output(["git", "pull"], cwd=WORKSPACE_DIR, text=True, timeout=30)
        embed = discord.Embed(
            title="✅ Git Pull Thành Công",
            description=f"```text\n{out.strip()}\n```",
            color=0x16A34A,
        )
        await loading_msg.delete()
        await ctx.send(embed=embed)
    except Exception as e:
        await loading_msg.delete()
        await ctx.send(f"❌ Lỗi khi git pull: `{str(e)}`")


@bot.command(name="run")
async def run_command(ctx, *, command_text: str = ""):
    """Thực thi lệnh shell trên server"""
    if not is_authorized(ctx.author.id):
        return

    if not command_text:
        await ctx.send("⚠️ Vui lòng nhập lệnh. Ví dụ: `!run git status` hoặc `!run ls -la`")
        return

    status_msg = await ctx.send(f"⏳ Đang thực thi: `{command_text}`...")

    try:
        process = await asyncio.create_subprocess_shell(
            command_text,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=WORKSPACE_DIR,
        )
        stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=60.0)

        output = stdout.decode("utf-8", errors="replace") + stderr.decode("utf-8", errors="replace")
        output = output.strip() or "(Không có dữ liệu trả về)"

        # Giới hạn ký tự tin nhắn Discord (2000 ký tự)
        if len(output) > 1800:
            output = output[:1800] + "\n... [Dữ liệu bị cắt bớt vì quá dài]"

        embed = discord.Embed(
            title=f"✅ Kết Quả Lệnh: `{command_text}`",
            description=f"```text\n{output}\n```",
            color=0x0056D2,
        )
        await status_msg.delete()
        await ctx.send(embed=embed)
    except asyncio.TimeoutError:
        await status_msg.delete()
        await ctx.send(f"❌ Lệnh `{command_text}` bị timeout (quá 60 giây).")
    except Exception as e:
        await status_msg.delete()
        await ctx.send(f"❌ Lỗi thực thi: `{str(e)}`")


@bot.event
async def on_message(message: discord.Message):
    # Bỏ qua tin nhắn do chính bot gửi
    if message.author == bot.user:
        return

    # Nếu là lệnh có tiền tố "!", để bot xử lý lệnh
    if message.content.startswith("!"):
        await bot.process_commands(message)
        return

    # Kiểm tra quyền truy cập
    if not is_authorized(message.author.id):
        return

    # Xử lý tin nhắn chat tự do bằng AI
    if not openai_client:
        await message.reply(
            "⚠️ Bạn chưa cấu hình `OPENAI_API_KEY` trong file .env. Bạn có thể dùng lệnh `!run <lệnh>` để chạy lệnh trực tiếp."
        )
        return

    async with message.channel.typing():
        try:
            response = openai_client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "Bạn là Antigravity Cloud AI Agent — trợ lý kỹ sư phần mềm AI cao cấp phục vụ người dùng từ xa qua Discord. "
                            "Trả lời xúc tích, rành mạch bằng tiếng Việt. Nếu người dùng muốn thực thi lệnh shell, hãy hướng dẫn họ "
                            "hoặc đưa ra cú pháp lệnh tương ứng bắt đầu bằng `!run <command>`."
                        ),
                    },
                    {"role": "user", "content": message.content},
                ],
                temperature=0.7,
                max_tokens=1500,
            )

            reply_text = response.choices[0].message.content

            # Chia nhỏ nếu vượt quá 1900 ký tự
            if len(reply_text) <= 1900:
                await message.reply(reply_text)
            else:
                chunks = [reply_text[i : i + 1800] for i in range(0, len(reply_text), 1800)]
                for chunk in chunks:
                    await message.reply(chunk)
        except Exception as e:
            await message.reply(f"❌ Lỗi khi gọi OpenAI: `{str(e)}`")


def main():
    print("🚀 Khởi động Antigravity Discord Cloud Agent...")
    bot.run(DISCORD_BOT_TOKEN)


if __name__ == "__main__":
    main()
