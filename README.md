# 🌦️ Weather Forecast App (Full Stack CRUD + API Integration)

A full-stack weather forecasting application built with **React (Vite)**, **Node.js (Express)**, and **MongoDB (Mongoose)**.  
Users can search for weather data by location, specify date ranges, and perform complete **CRUD operations** on stored weather records.

---

## 🚀 Features

### 🌍 Core Functionality
- **CREATE** → Search weather by location and save to MongoDB  
- **READ** → View previously saved weather records  
- **UPDATE** → Edit stored temperature or other fields  
- **DELETE** → Remove any saved record  

 


---

##  Tech Stack

**Frontend:** React (Vite) + TailwindCSS + Axios  
**Backend:** Node.js + Express.js + MongoDB (Mongoose)  
**Database:** MongoDB Atlas or local instance  
**API:** OpenWeatherMap API (for weather data)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

---

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

#### Create `.env` file inside `/backend`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your-connection-string>
OPENWEATHER_API_KEY=<your-openweather-api-key>
# Optional if adding YouTube
YOUTUBE_API_KEY=<your-youtube-api-key>
```

#### Run Backend Server:
```bash
npm run dev
```

Server runs on:  
👉 http://localhost:5000

---

### 3️⃣ Frontend Setup
```bash
cd .\frontend\weatherapp\
npm install
npm run dev
```

Frontend runs on:  
👉 http://localhost:5173

---

## 🌦️ API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/weather?query=city` | Fetch live weather from API |
| `POST` | `/api/save` | Save weather data to DB |
| `GET` | `/api/requests` | Fetch all saved weather records |
| `PUT` | `/api/requests/:id` | Update temperature/details |
| `DELETE` | `/api/requests/:id` | Delete saved record |


---

## 🧩 Folder Structure

```
project-root/
│
├── backend/
│   ├── config/db.js
│   ├── models/Weather.js
│   ├── routes/weatherRoutes.js
│   ├── routes/requestRoutes.js
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Searchbar.jsx
    │   │   └── SavedRequests.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── index.html
```

---

## Demo Video
_Add screenshots or GIFs of your UI here._

---



## 🧑‍💻 Developer

**Name:** Kalesh Patil  
**Email:** [kaleshpatil241@gmail.com]  
  

---

## ⭐ Notes
- MongoDB automatically creates the collection `savedweathers`
- Works with both local MongoDB and MongoDB Atlas
- Frontend URL: `http://localhost:5173`
- Backend URL: `http://localhost:5000`

---

### ✅ Project Status
✔️ Fully functional CRUD  
✔️ Integrated with live weather API  
✔️ Validations for input & date range  

