# 🌐 Simple Social Media Web App

A full-stack **MERN (MongoDB, Express, React, Node.js)** based social media web application where users can register, log in, create posts with images, like posts, and view other users' profiles — similar to Instagram’s feed system.

---

## 🚀 How to Run the Project

### 🖥️ Backend Setup (Node.js + Express + MongoDB)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/simple-social-media-app.git
   cd simple-social-media-app
Navigate to the Backend Folder

bash
Copy code
cd backend
Install Dependencies

bash
Copy code
npm install
Create a .env File

env
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Run the Server

bash
Copy code
npm start
Backend runs at ➡️ http://localhost:5000

🌐 Frontend Setup (React + Vite)
Navigate to the Frontend Folder

bash
Copy code
cd frontend
Install Dependencies

bash
Copy code
npm install
Create a .env File

env
Copy code
VITE_BACKEND_URL=https://simple-social-media-website.onrender.com
Run the Frontend

bash
Copy code
npm run dev
Frontend runs at ➡️ http://localhost:5173

🧠 Tech Stack Used
Frontend
⚛️ React (Vite)

🧭 React Router DOM

🎨 Bootstrap 5 + Custom CSS

🔐 JWT-based Auth Handling

⚡ Axios for API Calls

Backend
🟢 Node.js

⚙️ Express.js

🗄️ MongoDB with Mongoose

🔑 JWT Authentication

📦 Multer for Image Uploads

🌍 Render (Hosting)

Deployment
🖥️ Frontend → Vercel

⚙️ Backend → Render

🗃️ Database → MongoDB Atlas

✨ Features Implemented
✅ User Authentication

Signup / Login using JWT

Secure routes with token validation

✅ User Profile

View user profiles

Display user posts

✅ Post Management

Create posts with image uploads

View all posts in the feed

Responsive post layout

✅ Social Features

Like / Unlike posts

Display like counts

View comments section

✅ UI / UX

Clean, modern feed layout

Responsive design

Default avatar & image fallbacks

🧩 Folder Structure
bash
Copy code
simple-social-media-app/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api.js
│   │   └── App.jsx
│   ├── .env
│   └── vite.config.js
│
└── README.md
📸 Screenshots
(You can add screenshots here — like Feed Page, Profile Page, or Login Page)

👨‍💻 Author
Developed by: Bharat Gadde
📧 Email: [your-email@example.com]
🏆 Built with ❤️ using the MERN stack.

