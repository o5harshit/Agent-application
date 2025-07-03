# 🧑‍💼 Agent Management System (Admin Panel)

A MERN stack application built for Admins to manage agents, upload contact lists via CSV/XLSX files, and automatically distribute tasks (leads) among agents.

## 🚀 Features

- ✅ Admin Login (JWT-based authentication)
- ✅ Create and Manage Agents
- ✅ Upload CSV / XLSX files
- ✅ Distribute leads equally among 5 agents
- ✅ View assigned leads per agent
- ✅ Validations & Error Handling

---

## 🛠️ Tech Stack

**Frontend** (React + Vite)
- React.js + TailwindCSS + ShadCN UI
- Framer Motion (for animations)
- Axios for API requests
- React Router DOM
- Redux Toolkit

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- Multer (file uploads)
- JWT Authentication

---

## 📁 Folder Structure

```
agent-application/
│
├── Admin/                 # React frontend
│
├── server/                # Node.js backend
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── Middlewares/
│   └── uploads/           # File upload directory
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/o5harshit/Agent-application.git
cd Agent-application
```

---

### 2. Environment Variables

Create a `.env` file in `/server` directory with the following content:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/agentDB
JWT_SECRET=your_jwt_secret_key
```

---

### 3. Install Dependencies

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
cd ../Admin
npm install
```

---

### 4. Run the Application

**Backend:**

```bash
cd server
npm run dev
```

**Frontend:**

```bash
cd ../Admin
npm run dev
```

Now open `http://localhost:5173` to view the app.

---

## 📦 File Upload Format

Upload files in `.csv`, `.xls`, or `.xlsx` format with the following columns:

```csv
FirstName,Phone,Notes
John,+919876543210,Follow up next week
Alice,+918888123456,Call after 2PM
...
```

> Tasks (leads) are distributed equally across 5 agents.

---

## 📌 Routes

### Auth Routes

- `POST /api/admin/login` — Admin login

### Agent Routes

- `POST /api/agents/add` — Add new agent  
- `GET /api/agents/with-leads` — Get agents and their assigned leads  
- `POST /api/agents/upload` — Upload and distribute CSV/XLSX files  

> All protected routes require Bearer Token.

---

## 📞 Contact

For any queries, reach out at: srivastavaharshit2905@gmail.com

---

## 📄 License

This project is licensed under the MIT License.
