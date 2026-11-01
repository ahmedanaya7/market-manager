
# 🛒 Market Manager

A beginner-friendly **Python and MySQL-based Shop Management System** for managing shop products, prices, stock quantities, and product categories through a simple command-line interface.

## ✨ Features

- View all products.
- Add new products.
- Update product prices.
- Update product stock quantities.
- Delete products by name.
- Search products by name.
- Check low stock alerts (less than 5 items).

## 🛠️ Technologies Used

- Python
- MySQL
- mysql-connector-python
- python-dotenv

## 📁 Project Structure

```text
Market-Manager/
│
├── myshop.py
├── requirements.txt
├── .env
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Install Python and MySQL

Make sure Python and MySQL are installed on your system.

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/Market-Manager.git
```

Navigate to the project directory:

```bash
cd Market-Manager
```

### 3. Create the MySQL Database

Open MySQL and execute the following commands:

```sql
CREATE DATABASE shop_db;

USE shop_db;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    sold_quantity INT NOT NULL,
    category VARCHAR(100) NOT NULL
);
```

### 4. Install Required Packages

```bash
pip install -r requirements.txt
```

Your `requirements.txt` file should contain:

```text
mysql-connector-python
python-dotenv
```

### 5. Configure Environment Variables

Create a `.env` file in the project directory:

```env
DB_PASSWORD=your_mysql_password
```

Replace `your_mysql_password` with your actual MySQL password.

**Important:** Never upload your `.env` file to GitHub.

### 6. Run the Project

```bash
python myshop.py
```

## 📋 Main Menu

The program displays the following menu:

```text
--- MAIN MENU ---

1- View Product Lists
2- Add New Product
3- Update Product Price or Stock
4- Delete a Product
5- Search
6- Check Stock Alert
7- Exit
```

Choose an option from 1 to 7 to perform the desired operation.

## 🚨 Low Stock Alert

The system checks products with fewer than 5 items in stock.

```sql
SELECT * FROM products
WHERE stock_quantity < 5;
```

If any products have low stock, the program displays a warning.

## 🎯 Project Purpose

This project was developed to practice:

- Python programming.
- MySQL database connectivity.
- CRUD operations (Create, Read, Update, Delete).
- SQL queries.
- User input handling.
- Environment variable management.

It is a beginner-friendly project demonstrating how Python and MySQL can work together to build a simple shop inventory management system.

## 👩‍💻 Author

Created as a beginner-friendly Python and MySQL project.

---

⭐ If you find this project useful, don't forget to give it a star!
