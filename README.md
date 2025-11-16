# Event Finder

**To-do app** fullstack project that allows users to keep track of their task at their their own pace. User can Create, Edit and Delete their tasks as they want.

---

## Features

- Create, edit, and delete your own task
- User authentication and authorization (JWT-based)  
- Real-time API communication between frontend and backend  
- MongoDB database integration  
- Deployed and production-ready  

---

##  Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/event-finder.git
```

### 2. Install Dependencies
For both frontend and backend:
```bash
cd frontend
npm install

cd ../backend
npm install
```

---

## How to Run the Project

### Start the Backend
```bash
cd backend
npm run dev
```

### Start the Frontend
```bash
cd frontend
npm run dev
```

Then open your browser at:
```
Frontend → http://localhost:5173  
Backend  → http://localhost:3000
```

---

## Environment Variables

Both the frontend and backend require `.env` files.  
Use the `.env` file for reference.

### Backend `.env`
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:3000
```

---

## Deployed Links

- **Frontend (Vercel):** [https://event-finder-8uv3.vercel.app/](#)  
- **Backend (Render/Railway):** [https://event-finder-brown.vercel.app/](#)  


---

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, Vite  
**Backend:** Node, Express, TypeScript, MongoDB  
**Database:** MongoDB Atlas  
**Deployment:** Vercel (Frontend), Vercel (Backend)  


