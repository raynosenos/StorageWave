# 🌊 StorageWave

### Unlimited Cloud Storage powered by Telegram

StorageWave is a self-hosted cloud storage solution that uses Telegram as the storage backend. Get unlimited file storage for free!

---

## ✨ Features

- 📦 **Unlimited Storage** - Leverages Telegram's free cloud storage
- 🔒 **Private & Secure** - Your files, your server, your control
- 📁 **File System** - Create folders, upload/download files
- 👥 **Multi-user** - Support multiple users with access control
- 🚀 **Fast** - Built with Rust for maximum performance
- 🐳 **Docker Ready** - Easy deployment with Docker Compose

---

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Telegram Bot Token (from @BotFather)
- Telegram Channel (for storage)

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd StorageWave
```

1. **Create environment file**

```bash
cp .env.example .env
```

1. **Configure .env**

```env
PORT=8000
WORKERS=4
CHANNEL_CAPACITY=32
SUPERUSER_EMAIL=admin@storagewave.local
SUPERUSER_PASS=your-secure-password
ACCESS_TOKEN_EXPIRE_IN_SECS=1800
REFRESH_TOKEN_EXPIRE_IN_DAYS=14
SECRET_KEY=your-secret-key-here
TELEGRAM_API_BASE_URL=https://api.telegram.org

DATABASE_USER=storagewave
DATABASE_PASSWORD=storagewave
DATABASE_NAME=storagewave
DATABASE_HOST=db
DATABASE_PORT=5432
```

1. **Run with Docker**

```bash
docker compose up -d
```

1. **Access the app**
Open <http://localhost:8000> in your browser

---

## 📖 Usage

### 1. Create a Storage Worker (Telegram Bot)

1. Go to @BotFather on Telegram
2. Create a new bot with `/newbot`
3. Copy the bot token
4. In StorageWave, go to "Storage Workers" → "Register"
5. Enter the bot name and token

### 2. Create a Storage (Telegram Channel)

1. Create a new Telegram channel
2. Add your bot as an admin to the channel
3. Get the channel ID (use @username_to_id_bot)
4. In StorageWave, go to "Storages" → "Register"
5. Enter the storage name and channel ID (negative number)

### 3. Upload Files

1. Go to your storage
2. Click "Upload" to add files
3. Create folders to organize your files

---

## 🛠️ Development

### Tech Stack

- **Backend**: Rust (Axum, Tokio, SQLx)
- **Frontend**: SolidJS + SUID (Material UI)
- **Database**: PostgreSQL
- **Container**: Docker

### Build from Source

```bash
# Backend
cd pentaract
cargo build --release

# Frontend
cd ui
pnpm install
pnpm run build
```

---

## 📝 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🙏 Credits

This project is a fork of [Pentaract](https://github.com/Dominux/Pentaract) by Kirill Gimranov.

---

**Made with 💙 by StorageWave Team**
