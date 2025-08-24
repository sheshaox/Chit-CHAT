# 💬 Chit-Chat

Chit-Chat is a real-time chat application built with **React, Node.js, Express, MongoDB, and Socket.io**.  
It supports **real-time messaging, image sharing, online/offline status tracking, and user authentication**.

---

## 🚀 Features
- 🔐 User authentication (Sign up / Login with JWT)
- 👤 User profile with bio and avatar
- 🟢 Online/offline status tracking
- 💬 Real-time messaging using Socket.io
- 🖼️ Image sharing in chats
- 📱 Responsive UI built with Tailwind CSS

---

## 🛠️ Tech Stack
**Frontend**
- React + Vite
- Tailwind CSS
- React Router
- React Context API

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io
- Cloudinary (for image upload)
- JWT Authentication

---



### 1️⃣ Clone the Repository
git clone https://github.com/YOUR-USERNAME/chit-chat.git
cd chit-chat
--------------------------------------------------------------------------------------


## ⚙️ Installation & Setup


**Backend Setup**

cd server
<br>
npm install
<br>

Create **.env** file inside server/:
<br>

PORT=5000
<br>
MONGODB_URI=mongodb://localhost:27017(ur mongodb database url)
<br>
JWT_SECRET=your_jwt_secret
<br>
CLOUDINARY_CLOUD_NAME=your_cloud_name
<br>
CLOUDINARY_API_KEY=your_api_key
<br>
CLOUDINARY_API_SECRET=your_api_secret


Run Backend
<br>
npm run dev


**Frontend Setup**

cd client
<br>
npm install

Create **.env**  file inside client/:
<br>
VITE_API_URL=http://localhost:5000/api

Run Frontend 
<br>
npm run dev





