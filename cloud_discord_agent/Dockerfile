# Sử dụng Python 3.11 Slim
FROM python:3.11-slim

# Cài đặt git, curl, build essentials
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Thư mục làm việc
WORKDIR /app

# Cài đặt thư viện Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ code vào container
COPY . .

# Khởi chạy Discord Bot
CMD ["python", "discord_bot.py"]
