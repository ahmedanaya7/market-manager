# ⚡ Market Manager

> A modern, full-stack shop inventory management web application built with FastAPI, React, and MySQL.

---

## 🚀 Overview

**Market Manager** is designed to streamline day-to-day store operations. It provides a lightning-fast, responsive dashboard for tracking products, managing stock quantities, and performing live updates without page reloads.

---

## ✨ Key Features

- **⚡ Real-Time Dashboard:** Instant visibility of total items and live store metrics.
- **➕ Product Management:** Add, update, and manage products with clean UI controls.
- **✏️ Seamless Editing:** Inline editing support to update product names, prices, and stock quickly.
- **🔍 Smart Search:** Instantly filter inventory items by product name.
- **🛡️ Secure Connectivity:** Uses URL-encoded environment variables (`python-dotenv`) to handle special characters in database credentials securely.

---

## 🛠️ Tech Stack

### **Backend**
* **Framework:** FastAPI
* **ORM:** SQLAlchemy
* **Database Driver:** PyMySQL
* **Server:** Uvicorn

### **Frontend**
* **Library:** React.js
* **Styling:** CSS3 (Modern Flexbox Dashboard)

### **Database**
* **DBMS:** MySQL

---

## 📁 Project Directory Structure

```text
Market-Manager/
├── myshop.py         # FastAPI Backend Server API
├── models.py         # SQLAlchemy Database Models
├── database.py       # DB Engine & Session Management
├── requirements.txt  # Python Dependencies
├── .env              # Environment Configuration (DB Password)
├── .gitignore        # Ignored files (venv, node_modules, .env)
└── frontend/         # React Frontend Application
    ├── src/
    │   ├── App.js    # Main Dashboard Component & Logic
    │   └── App.css   # Custom Dashboard Styling
    └── package.json  # Node Dependencies