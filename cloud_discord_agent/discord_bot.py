import os
import sys
import subprocess
import asyncio
import logging
import discord
from discord.ext import commands
from aiohttp import web
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
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o")
WORKSPACE_DIR = os.getenv("WORKSPACE_DIR", os.getcwd())

CURRENT_MODEL = OPENAI_MODEL

if not DISCORD_BOT_TOKEN:
    raise ValueError("Thiếu DISCORD_BOT_TOKEN trong file .env!")

# Khởi tạo OpenAI Client nếu có key (tránh lỗi nếu base_url rỗng)
base_url = os.getenv("OPENAI_BASE_URL", "").strip() or None
openai_client = OpenAI(api_key=OPENAI_API_KEY, base_url=base_url) if OPENAI_API_KEY else None

# Cấu hình Discord Intents
intents = discord.Intents.default()
intents.message_content = True  # Cần bật Message Content Intent trên Discord Portal

bot = commands.Bot(command_prefix="!", intents=intents)


def is_authorized(user_id: int) -> bool:
    """Kiểm tra quyền truy cập (Chỉ cho phép chủ nhân sử dụng)."""
    if not ALLOWED_USER_ID or str(ALLOWED_USER_ID).strip() == "":
        return True  # Nếu chưa cấu hình thì tạm thời cho phép tất cả
    return str(user_id).strip() == str(ALLOWED_USER_ID).strip()


async def check_auth_and_warn(target_send, user_id: int, user_name: str) -> bool:
    """Kiểm tra quyền và báo ID cụ thể nếu bị chặn thay vì im lặng"""
    if is_authorized(user_id):
        return True
    
    warning_msg = (
        f"⛔ **Cảnh báo truy cập:** Tài khoản `{user_name}` (ID: `{user_id}`) chưa khớp với `DISCORD_ALLOWED_USER_ID` trên Render.\n"
        f"👉 Nếu đây là tài khoản của bạn, hãy copy số ID `{user_id}` này dán vào biến `DISCORD_ALLOWED_USER_ID` trên Render Dashboard để mở khóa."
    )
    try:
        await target_send(warning_msg)
    except Exception:
        pass
    return False


@bot.event
async def on_ready():
    logger.info(f"🟢 Bot đã đăng nhập thành công với tên: {bot.user} (ID: {bot.user.id})")
    print(f"🚀 AI Discord Cloud Agent đang online 24/7 với tên: {bot.user}")
    activity = discord.Activity(type=discord.ActivityType.watching, name="AI Learning System")
    await bot.change_presence(status=discord.Status.online, activity=activity)


@bot.command(name="help_agent")
async def help_command(ctx):
    """Hiển thị hướng dẫn sử dụng"""
    if not await check_auth_and_warn(ctx.send, ctx.author.id, ctx.author.name):
        return

    embed = discord.Embed(
        title="🤖 AI CLOUD AGENT — DANH SÁCH LỆNH",
        description="Bot đang chạy trực tiếp trên Cloud 24/7 để hỗ trợ bạn lập trình và quản trị hệ thống.",
        color=0x0056D2,  # Coursera Royal Blue
    )
    embed.add_field(name="!status", value="Kiểm tra trạng thái server Cloud, RAM, Git branch, Model AI", inline=False)
    embed.add_field(name="!model [tên_model]", value="Xem hoặc đổi model GPT (ví dụ: `!model gpt-4o-mini`, `!model gpt-4o`, `!model gpt-4.1`)", inline=False)
    embed.add_field(name="!run <lệnh>", value="Chạy lệnh terminal trên server (ví dụ: `!run git status`)", inline=False)
    embed.add_field(name="!pull", value="Kéo mã nguồn mới nhất từ GitHub (`git pull`)", inline=False)
    embed.add_field(name="Nhắn tin tự do", value="Gõ bất kỳ câu hỏi nào trong kênh, AI sẽ phân tích và hỗ trợ bạn!", inline=False)
    embed.set_footer(text="Hệ thống chạy ngầm 24/7 ngay cả khi máy tính tắt.")
    await ctx.send(embed=embed)


def get_git_info():
    """Lấy thông tin git thông minh (hỗ trợ cả local lẫn Render Cloud Container)"""
    cur = os.path.abspath(WORKSPACE_DIR)
    git_dir = None
    for _ in range(3):
        if os.path.exists(os.path.join(cur, ".git")):
            git_dir = cur
            break
        parent = os.path.dirname(cur)
        if parent == cur:
            break
        cur = parent

    # Nếu trên Render không có .git, đọc từ biến hệ thống của Render
    render_commit = os.getenv("RENDER_GIT_COMMIT")
    render_branch = os.getenv("RENDER_GIT_BRANCH", "main")
    if not git_dir:
        if render_commit:
            return render_branch, f"Render Deploy: {render_commit[:7]}"
        return "Render Cloud", "Managed Container (Latest)"

    try:
        git_log = subprocess.check_output(
            ["git", "log", "-1", "--oneline"],
            cwd=git_dir,
            stderr=subprocess.DEVNULL,
            text=True,
            timeout=5,
        ).strip()
        git_branch = subprocess.check_output(
            ["git", "branch", "--show-current"],
            cwd=git_dir,
            stderr=subprocess.DEVNULL,
            text=True,
            timeout=5,
        ).strip()
        return git_branch or "main", git_log or "Latest"
    except Exception:
        return render_branch, "Render Cloud Container"


@bot.command(name="status")
async def status_command(ctx):
    """Kiểm tra tình trạng server và git repository"""
    if not await check_auth_and_warn(ctx.send, ctx.author.id, ctx.author.name):
        return

    loading_msg = await ctx.send("🔍 Đang kiểm tra hệ thống Cloud...")

    git_branch, git_log = get_git_info()

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
        value=f"`Sẵn sàng ({CURRENT_MODEL}) ✓`" if openai_client else "`Chưa cấu hình API Key`",
        inline=True,
    )

    await loading_msg.delete()
    await ctx.send(embed=embed)


@bot.command(name="model")
async def model_command(ctx, new_model: str = None):
    """Xem hoặc đổi mô hình GPT đang sử dụng (gpt-6.1-sol, gpt-4o, gpt-4o-mini, gpt-4.1)"""
    global CURRENT_MODEL
    if not await check_auth_and_warn(ctx.send, ctx.author.id, ctx.author.name):
        return

    if not new_model:
        embed = discord.Embed(
            title="🧠 CẤU HÌNH MÔ HÌNH AI (GPT)",
            description=f"Mô hình đang hoạt động: **`{CURRENT_MODEL}`**\n\nBạn có thể chuyển sang model khác bằng cú pháp: `!model <tên_model>`",
            color=0x0056D2,
        )
        embed.add_field(
            name="Các model khuyên dùng",
            value=(
                "• `gpt-6.1-sol`: Mô hình cao cấp thế hệ mới, hỗ trợ max_completion_tokens\n"
                "• `gpt-4o`: Cân bằng tốt nhất, suy luận logic cao, phân tích code chuẩn\n"
                "• `gpt-4o-mini`: Siêu nhanh, phản hồi tức thì, tiết kiệm chi phí tối đa\n"
                "• `gpt-4.1`: Phiên bản thế hệ mới nhất cho lập trình và context lớn"
            ),
            inline=False,
        )
        await ctx.send(embed=embed)
        return

    target = new_model.strip()
    CURRENT_MODEL = target
    embed = discord.Embed(
        title="✅ ĐÃ CHUYỂN ĐỔI MÔ HÌNH GPT THÀNH CÔNG",
        description=f"Từ giờ AI Agent sẽ sử dụng: **`{CURRENT_MODEL}`** để trả lời bạn.",
        color=0x16A34A,
    )
    await ctx.send(embed=embed)


@bot.command(name="pull")
async def pull_command(ctx):
    """Kéo mã nguồn mới nhất từ GitHub"""
    if not await check_auth_and_warn(ctx.send, ctx.author.id, ctx.author.name):
        return

    cur = os.path.abspath(WORKSPACE_DIR)
    git_dir = None
    for _ in range(3):
        if os.path.exists(os.path.join(cur, ".git")):
            git_dir = cur
            break
        parent = os.path.dirname(cur)
        if parent == cur:
            break
        cur = parent

    if not git_dir:
        embed = discord.Embed(
            title="ℹ️ RENDER CLOUD AUTO-DEPLOY",
            description=(
                "Bot đang chạy trên môi trường **Render Cloud Web Service**.\n\n"
                "Render tự động kết nối trực tiếp với GitHub và sẽ **tự động deploy bản mới nhất** "
                "mỗi khi có commit được `git push` lên `main`. Bạn không cần chạy lệnh `!pull` thủ công!"
            ),
            color=0x0056D2,
        )
        await ctx.send(embed=embed)
        return

    loading_msg = await ctx.send("🔄 Đang chạy `git pull` từ GitHub...")
    try:
        out = subprocess.check_output(
            ["git", "pull"], cwd=git_dir, stderr=subprocess.STDOUT, text=True, timeout=30
        )
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
    if not await check_auth_and_warn(ctx.send, ctx.author.id, ctx.author.name):
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

    # Kiểm tra quyền truy cập (nếu vi phạm sẽ báo thẳng ID ra chat)
    if not await check_auth_and_warn(message.reply, message.author.id, message.author.name):
        return

    # Xử lý tin nhắn chat tự do bằng AI
    if not openai_client:
        await message.reply(
            "⚠️ Bạn chưa cấu hình `OPENAI_API_KEY` trong file .env. Bạn có thể dùng lệnh `!run <lệnh>` để chạy lệnh trực tiếp."
        )
        return

    async with message.channel.typing():
        try:
            call_params = {
                "model": CURRENT_MODEL,
                "messages": [
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

            # Chia nhỏ nếu vượt quá 1900 ký tự
            if len(reply_text) <= 1900:
                await message.reply(reply_text)
            else:
                chunks = [reply_text[i : i + 1800] for i in range(0, len(reply_text), 1800)]
                for chunk in chunks:
                    await message.reply(chunk)
        except Exception as e:
            await message.reply(f"❌ Lỗi khi gọi OpenAI: `{str(e)}`")


async def health_check_handler(request):
    """Health check endpoint cho Render Web Service"""
    html_content = """
    <!DOCTYPE html>
    <html>
    <head><title>Antigravity Discord Agent</title></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; color: #0f172a; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
        <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); text-align: center; max-width: 480px;">
            <div style="font-size: 48px; margin-bottom: 12px;">🟢</div>
            <h1 style="color: #0056d2; margin: 0 0 8px 0; font-size: 24px;">Antigravity Discord Agent</h1>
            <p style="color: #16a34a; font-weight: 600; margin: 0 0 16px 0;">ONLINE 24/7 CLOUD WORKER</p>
            <p style="color: #64748b; font-size: 14px; margin: 0;">Sẵn sàng nhận lệnh từ Discord App trên iOS / Android.</p>
        </div>
    </body>
    </html>
    """
    return web.Response(text=html_content, content_type="text/html")


async def start_web_server():
    """Khởi động web server phụ trợ để Render xác nhận health check $PORT"""
    port = int(os.getenv("PORT", 8080))
    app = web.Application()
    app.router.add_get("/", health_check_handler)
    app.router.add_get("/health", health_check_handler)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", port)
    await site.start()
    logger.info(f"🌐 Web health-check server đã mở tại cổng: {port}")


async def main():
    print("🚀 Khởi động Antigravity Discord Cloud Agent...")
    await start_web_server()
    await bot.start(DISCORD_BOT_TOKEN)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Bot đã dừng bởi người dùng.")
