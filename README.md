<!-- Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0E75B6&height=120&section=header&text=EventEase:%20Ultimate%20Event%20Management%20Software&fontSize=32&fontColor=FFFFFF" alt="EventEase Banner" />

<p align="center">
  <img src="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/eventlogo.png" width="150" alt="EventEase Logo"/>
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&pause=700&color=0E75B6&center=true&vCenter=true&width=800&lines=Plan+Smarter,+Collaborate+Better,+Execute+Flawlessly;Real-Time+Team+Management+%7C+Calendar+Sync+Coming+Soon;Unified+Platform+for+Modern+Event+Needs" alt="Typing SVG" />
</p>

---

## 🚀 EventEase: Ultimate Event Management Software for 2025

**EventEase** is a modern, feature-rich platform for managing events — from small meetups to large conferences. Built with the MERN stack and powered by real-time collaboration tools, it unifies two previously separate tools (EventEase and EventPro) into a seamless, scalable, and cloud-optimized event planning ecosystem.

> 💡 This unified version includes event scheduling, team collaboration, role-based access, and is optimized for speed, responsiveness, and future integrations like Google Calendar sync.

---

## 📸 Screenshots

<p align="center">
  <img src="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/preview-demo.gif" width="90%" alt="Platform Preview"/>
</p>

---

## ✨ Features at a Glance

| EventEase Module | EventPro Module |
|------------------|-----------------|
| 🔐 Google & Email Auth | 🔐 Google & Email Auth |
| 📅 Smart Scheduling (Coming Soon) | 📆 Create / Edit / Delete Events |
| 🔄 Google Calendar Sync | 📊 Paginated Event Table |
| 🧑‍🤝‍🧑 Real-Time Collaboration | 🎛️ Admin & User Dashboards |
| 💬 Toast Feedback | 🎨 Modern UI with Styled Components |

---

## 🛠 Tech Stack

**Frontend**  
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux)
![Styled Components](https://img.shields.io/badge/Styled--Components-DB7093?style=flat&logo=styled-components)

**Backend**  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb)

**Cloud / API**  
![Vercel](https://img.shields.io/badge/Vercel-000?style=flat&logo=vercel)
![Render](https://img.shields.io/badge/Render-4DABF7?style=flat&logo=render)
![Google Calendar API](https://img.shields.io/badge/Google_Calendar_API-4285F4?style=flat&logo=googlecalendar)
![AWS S3](https://img.shields.io/badge/AWS_S3-FF9900?style=flat&logo=amazonaws)

---

## 📍 Live Links

- 🌐 Website: [https://event-manager-two.vercel.app](https://event-manager-two.vercel.app)  
- 🛠️ API: [https://eventmanager-api-19july.onrender.com/api](https://eventmanager-api-19july.onrender.com/api)  
- 💻 GitHub: [https://github.com/SanjayPatidar12/eventease-eventpro](https://github.com/SanjayPatidar12/eventease-eventpro)

---

## 🧩 Unified Platform Structure

**EventEase**
- `/eventease/login` – Login with email or Google
- `/eventease/create-event` – Add new events
- `/eventease/sync-google-calendar` – Calendar integration (coming soon)
- `/eventease` – Explore upcoming scheduling features

**EventPro**
- `/eventpro/add-event` – Add/Edit/Delete events
- `/eventpro/list-events` – Paginated view
- `/eventpro/dashboard` – User dashboard
- `/eventpro/admin-dashboard` – Admin overview
- `/eventpro/forgot-password` – Password recovery
- Form validations and route protections

---

## ⚙️ Local Setup

```bash
# Clone repo
git clone https://github.com/SanjayPatidar12/eventease-eventpro.git
cd eventease-eventpro

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Setup frontend .env
REACT_APP_API_URL=https://eventmanager-api-19july.onrender.com/api

# Setup backend .env
MONGO_URI=<your_mongo_url>
JWT_SECRET=<your_jwt_secret>
SESSION_SECRET=<your_session_secret>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>

# Run backend
npm run dev

# Run frontend
cd ../frontend
npm start

