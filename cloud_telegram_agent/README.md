# Hướng Dẫn Cài Đặt AI Cloud Agent Trên Telegram (Chạy 24/7 Khi Tắt Máy)

Hệ thống này cho phép bạn ra lệnh cho AI Agent thực hiện code, kiểm tra git, chạy lệnh server trực tiếp từ điện thoại thông qua **Telegram**, ngay cả khi máy tính của bạn đã tắt nguồn.

---

## BƯỚC 1: Tạo Bot Telegram & Lấy Token (1 Phút)

1. Mở ứng dụng **Telegram** trên điện thoại hoặc máy tính.
2. Tìm kiếm bot chính thức của Telegram: `@BotFather`.
3. Bấm **Start** hoặc gõ lệnh `/newbot`.
4. Nhập tên hiển thị cho bot (ví dụ: `Huong AI Agent`).
5. Nhập username cho bot (kết thúc bằng chữ `bot`, ví dụ: `huong_ai_agent_bot`).
6. `@BotFather` sẽ gửi cho bạn một chuỗi token dạng:
   `7123456789:AAFlm3k_ABCD1234XYZ...` ➔ **Lưu lại token này (`TELEGRAM_BOT_TOKEN`)**.

---

## BƯỚC 2: Lấy User ID của bạn để bảo mật

Để đảm bảo người lạ không thể nhắn tin điều khiển server của bạn:
1. Trên Telegram, tìm kiếm bot: `@userinfobot`.
2. Bấm **Start**, bot sẽ gửi lại thông tin của bạn, trong đó có trường `Id` (ví dụ: `123456789`).
3. Lưu lại số này ➔ đây là `TELEGRAM_ALLOWED_USER_ID`.

---

## BƯỚC 3: Chạy Thử Ngay Trên Máy Tính Của Bạn

1. Mở terminal vào thư mục này:
   ```bash
   cd d:\my_ai_team\cloud_telegram_agent
   ```
2. Tạo file `.env` từ `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Điền các giá trị vào file `.env`:
   * `TELEGRAM_BOT_TOKEN`: Token lấy từ Bước 1
   * `TELEGRAM_ALLOWED_USER_ID`: ID lấy từ Bước 2
   * `OPENAI_API_KEY`: Key OpenAI của bạn (`sk-...`)
4. Cài đặt thư viện:
   ```bash
   pip install -r requirements.txt
   ```
5. Chạy bot:
   ```bash
   python telegram_bot.py
   ```
6. Mở Telegram, tìm bot của bạn và gõ `/start` hoặc `/status` để xem kết quả!

---

## BƯỚC 4: Đưa Lên Cloud Để Chạy 24/7 (Miễn Phí)

### Cách A: Dùng Railway / Render (Cực kỳ dễ, 2 phút)
1. Đẩy thư mục này lên GitHub repo của bạn.
2. Truy cập [Railway.app](https://railway.app) hoặc [Render.com](https://render.com).
3. Đăng nhập bằng GitHub ➔ Bấm **New Project** ➔ Chọn Repository của bạn.
4. Chọn Dockerfile hoặc môi trường Python.
5. Thêm 3 biến môi trường trong mục **Environment Variables**:
   * `TELEGRAM_BOT_TOKEN`
   * `TELEGRAM_ALLOWED_USER_ID`
   * `OPENAI_API_KEY`
6. Bấm **Deploy**!
➔ **Xong!** Bot sẽ chạy liên tục 24/7 trên Cloud. Bạn có thể tắt máy tính thoải mái và chỉ cần dùng điện thoại để ra lệnh.

### Cách B: Chạy trên Cloud VPS (DigitalOcean / Oracle / AWS)
Nếu bạn có VPS riêng:
```bash
git clone <repo_url>
cd cloud_telegram_agent
docker build -t ai-telegram-agent .
docker run -d --restart always --name ai_bot --env-file .env ai-telegram-agent
```
Container Docker sẽ tự động chạy ngầm mãi mãi, tự khởi động lại khi reboot VPS.
