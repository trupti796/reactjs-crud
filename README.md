# User CRUD App – Core PHP + React.js + MySQL

![Preview Screenshot](preview.png)

This is a full-stack user management application that allows you to perform CRUD (Create, Read, Update, Delete) operations on user data. The stack includes:

- **Backend:** Core PHP with MySQLi
- **Frontend:** React.js (Vite)
- **Database:** MySQL
- **Version Control:** Git + GitHub

---

## 📁 Project Structure

```
reactjs-crud/
├── backend/
│   ├── config.php
│   ├── cors.php
│   ├── db/
│   │   └── reactjs-crud-db.sql
│   └── api/
│       ├── create.php
│       ├── read.php
│       ├── update.php
│       └── delete.php
├── frontend/
│   └── src/
│       ├── App.jsx
│       └── UserForm.jsx
└── README.md
```

---

## 🧱 Technologies Used

| Part         | Tech/Tool          |
|--------------|--------------------|
| Backend      | PHP (MySQLi)       |
| Frontend     | React.js with Vite |
| Database     | MySQL              |
| Styling      | ailwind CSS        |
| Version Ctrl | Git + GitHub       |

---

## ⚙️ Setup Instructions

### 🗃️ 1. MySQL Database Setup

1. Open PHPMyAdmin or MySQL CLI.
2. Run the following SQL commands:

```sql
CREATE DATABASE reactjs-crud-db;

USE reactjs-crud-db;

CREATE TABLE tbl_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    plain_password VARCHAR(100),
    dob DATE
);
```

### 💻 2. Backend Setup (Core PHP)

1. Copy the `backend/` folder into your web server directory (`htdocs` for XAMPP).
2. Start **Apache** and **MySQL** using XAMPP/WAMP.
3. Update your `backend/config.php` with the correct DB credentials if needed:

```php
$servername = "localhost";
$username = "root";
$password = "";
$database = "reactjs-crud-db";
```

4. Test the backend by visiting this URL in browser:  
   `http://localhost/backend/api/read.php`

You should see JSON output of user data.

### 🌐 3. Frontend Setup (React.js)

1. Navigate to the `frontend/` directory.

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

4. Open your browser at:  
   `http://localhost:5173`

You will see a form to add users and a list to display them.

> Make sure backend is running at `http://localhost/backend/`. If different, update URLs in Axios requests in `App.jsx` and `UserForm.jsx`.

---

## 🚀 How It Works

- **Add User:** Form sends `POST` request to `create.php`
- **View Users:** Frontend fetches data from `read.php`
- **Update/Delete:** Backend APIs ready (`update.php`, `delete.php`)


---

## 🔁 Features

- ✅ Add, View, Update, Delete users
- ✅ Form validations
- ✅ Password hashing (secure)

---

🤔 Decisions & Assumptions
📌 Decisions Made
Tech Stack Chosen:
Used Core PHP with MySQLi for the backend and React.js with Vite for the frontend to showcase full-stack capability using minimal frameworks.

Database Schema Design:
Kept the tbl_users table simple with fields: id, name, email, password, plain_password, and dob to cover typical CRUD operations.

Password Handling:

Used PHP's password_hash() for securely storing passwords.

Stored plain_password temporarily for display/testing purposes (in real-world projects, this would not be done).

API Communication:
Chose to keep the API structure RESTful (create.php, read.php, update.php, delete.php) for clarity and separation of concerns.

Form Validation:
Frontend form has basic validation for email, required fields, and password match.

Styling:
Used minimal Tailwind CSS and utility classes for a clean and responsive UI without external UI libraries.

💡 Assumptions
The app is intended for local development/demo purposes, not production use.

User roles, authentication, and authorization are out of scope for this project.

The user email must be unique and is treated as a key identifier apart from ID.

Backend is hosted on http://localhost/backend/ – this may need adjustment in production.

Deletion is soft (confirmation required) but is not reversible.

## 🚀 Upcoming

- 🔐 User login/auth
- 🌐 Pagination, search

---

## 🧑‍💻 Author

Created by **[Trupti Gaurav Khadtare]**  
For any queries, feel free to contact me.

---

## 📌 License

This project is licensed under the MIT License.
