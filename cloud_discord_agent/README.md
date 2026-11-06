# Hướng Dẫn Dựng AI Cloud Agent Bằng Discord (Chạy 24/7 Ngay Cả Khi Tắt Máy)

Hướng dẫn này giúp bạn điều khiển AI Agent từ điện thoại (iOS / Android) thông qua **Discord**. Hoàn toàn **MIỄN PHÍ 100%**, không cần số điện thoại và hoạt động cực kỳ mượt mà tại Việt Nam.

---

## BƯỚC 1: Tạo Discord Bot & Lấy Token (2 Phút)

1. Truy cập vào cổng phát triển của Discord: [Discord Developer Portal](https://discord.com/developers/applications).
2. Đăng nhập bằng tài khoản Discord của bạn.
3. Bấm nút **New Application** ở góc trên bên phải ➔ Đặt tên cho app (ví dụ: `Huong AI Agent`) ➔ Bấm **Create**.
4. Chọn mục **Bot** ở thanh menu bên trái:
   * Bấm **Reset Token** (hoặc Copy Token) để lấy chuỗi Token bí mật.
   * 👉 **Lưu lại chuỗi này, đây là `DISCORD_BOT_TOKEN`**.
5. **Rất quan trọng (Bật quyền đọc tin nhắn):**
   * Vẫn trong mục **Bot**, cuộn xuống phần **Privileged Gateway Intents**.
   * Bật công tắc: **`MESSAGE CONTENT INTENT`** lên màu xanh (ON) ➔ Bấm **Save Changes** ở cuối trang.

---

## BƯỚC 2: Thêm Bot Vào Server Discord Của Bạn

1. Trên Discord, tạo một Server riêng (bấm dấu `+` ở danh sách server ➔ Chọn *Create My Own* ➔ *For me and my friends*).
2. Quay lại trang [Discord Developer Portal](https://discord.com/developers/applications):
   * Chọn mục **Installation** (hoặc **OAuth2** ➔ **URL Generator**).
   * Trong phần **Scopes**: Tích chọn `bot`.
   * Trong phần **Bot Permissions**: Tích chọn:
     * `Send Messages`
     * `Read Message History`
     * `Embed Links`
     * `Attach Files`
   * Sao chép đường link được tạo ra ở mục **Install Link** (hoặc Generated URL).
3. Dán link đó vào trình duyệt, chọn Server bạn vừa tạo và bấm **Authorize**.
➔ **Xong!** Bạn sẽ thấy bot xuất hiện trong Server Discord của mình.

---

## BƯỚC 3: Lấy User ID Của Bạn Để Bảo Mật

Để đảm bảo người khác không thể vào ra lệnh bậy bạ trên server:
1. Mở Discord trên máy tính hoặc điện thoại.
2. Vào **User Settings (Cài đặt tài khoản)** ➔ Chọn **Advanced (Nâng cao)** ➔ Bật **Developer Mode (Chế độ nhà phát triển)** lên ON.
3. Nhấp chuột phải (hoặc nhấn giữ) vào tên tài khoản của bạn ➔ Chọn **Copy User ID**.
4. 👉 **Lưu lại dãy số này, đây là `DISCORD_ALLOWED_USER_ID`**.

---

## BƯỚC 4: Chạy Thử Ngay Trên Máy Tính

1. Mở terminal vào thư mục:
   ```bash
   cd d:\my_ai_team\cloud_discord_agent
   ```
2. Tạo file `.env` (sao chép từ `.env.example`):
   ```bash
   cp .env.example .env
   ```
3. Mở file `.env` và điền:
   ```env
   DISCORD_BOT_TOKEN=token_lấy_ở_bước_1
   DISCORD_ALLOWED_USER_ID=id_lấy_ở_bước_3
   OPENAI_API_KEY=sk-proj-...
   ```
4. Cài đặt thư viện:
   ```bash
   pip install -r requirements.txt
   ```
5. Khởi động bot:
   ```bash
   python discord_bot.py
   ```
6. Vào Discord, gõ `!status` hoặc `!help_agent` để xem bot trả lời!

---

## BƯỚC 5: Đưa Lên Cloud Để Chạy 24/7 (Miễn Phí)

### Cách Dễ Nhất: Dùng Render.com (Miễn phí 100%)
1. Đăng ký tài khoản tại [Render.com](https://render.com) (đăng nhập bằng GitHub).
2. Bấm **New +** ➔ Chọn **Background Worker**.
3. Chọn Repository **`HuongDS/ai_learning`** (đã có sẵn thư mục `cloud_discord_agent`).
4. Cấu hình:
   * **Root Directory**: `cloud_discord_agent`
   * **Environment**: `Docker`
5. Trong mục **Environment Variables**, thêm 3 biến:
   * `DISCORD_BOT_TOKEN`
   * `DISCORD_ALLOWED_USER_ID`
   * `OPENAI_API_KEY`
6. Bấm **Create Background Worker**.

➔ **Xong!** Bot sẽ chạy liên tục 24/7 trên Cloud. Bạn tắt máy tính hoàn toàn, bất cứ lúc nào mở app Discord trên điện thoại cũng có thể nhắn tin ra lệnh cho bot!
