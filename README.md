# TodoShare

A real-time collaborative to-do list app that allows users to manage tasks efficiently in teams. Built with a powerful MERN stack backend and a clean, interactive UI using React, Tailwind CSS, and DaisyUI. Supports real-time updates using Socket.IO.

---

## Features

-  Two user types: Admin and Member
-  Task creation, completion toggle, starring
-  Assign and unassign tasks (Admin only)
-  Role-based control over task actions
-  Real-time sync of tasks and members via WebSockets
-  Responsive UI using Tailwind CSS and DaisyUI
-  Mobile-friendly layout

---

## Tech Stack

### **Frontend**
- React 19
- Zustand (state management)
- Tailwind CSS
- DaisyUI (UI components)
- Axios
- Socket.IO Client
- Lucide React (icons)
- React Router
- React Hot Toast (notifications)

### **Backend**
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO (real-time updates)
- JWT (authentication)
- bcryptjs (password hashing)
- Cloudinary (media uploads)

---

## Deployment

- Initially deployed on **Vercel**.  
  ⚠️ *However, Vercel does not support WebSocket (Socket.IO) servers properly.*

- Final deployment was done on:
  - **Render** 
  - link :  https://todo-share.onrender.com/

---

##  Project Structure

```
/client        → React frontend
/server        → Express backend
```

---

## Getting Started (Local Development)

### 1. **Clone the Repository**

```bash
git clone https://github.com/TanmayAggarwal87/Todo-list-2.0.git
cd Todo-list-2.0
```

### 2. **Setup Backend**

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:

```bash
node index.js
```

Or use `nodemon`:

```bash
nodemon index.js
```

### 3. **Setup Frontend**

```bash
cd ../client
npm install
npm run dev
```

---


##  Learnings

- Learned to handle **real-time communication** using Socket.IO
- Understood the **limitations of Vercel** for backend Socket.IO support
- Built **role-based conditional rendering** and controls
- Improved frontend UX with **DaisyUI** and responsive design
- Better understanding of MERN stack and state managements

---

## 🏁 Future Improvements

- Add comments/notes per task
- Set deadlines and reminders
- Track task activity history
- Invite/Remove users via email

---

## 🤝 Contributing

Feel free to open issues or pull requests! Feedback and contributions are always welcome.

---

