💸 QuickPay – Simple Wallet App

QuickPay is a wallet web app I built where users can:

Sign up and log in

See their wallet balance

Transfer money to other users instantly

Get real-time updates after every transaction

It’s kind of like a basic PhonePe/Paytm style wallet, but built from scratch using the MERN stack. No payment gateway or Razorpay integration here just my own logic with JWT auth, MongoDB, and Express API.

🚀 Tech Stack

Frontend: React, TailwindCSS, Axios

Backend: Node.js, Express, MongoDB (Mongoose)

Auth: JWT Tokens stored in localStorage + HTTP-only cookies

Deployment:

Backend → Vercel

Frontend → Netlify

⚡ Features

🔑 Secure login/signup with JWT

👤 User search & transfer money between accounts

💰 Check wallet balance

📡 Instant database update after transfer

🌐 Fully deployed (Netlify + Vercel)

📂 Project Setup
1. Clone the repo
git clone https://github.com/your-username/quickpay.git
cd quickpay

2. Backend setup
cd backend
npm install


Create a .env file and add:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key


Run locally:

npm run dev

3. Frontend setup
cd frontend
npm install


In .env:

VITE_API_URL=http://localhost:5000/   # or deployed backend URL


Run locally:

npm run dev

🌍 Live Demo

Frontend (Netlify): https://quiickkpay.netlify.app

Backend (Vercel): https://quick-pay-three.vercel.app

🛠 Debugging & Fixes I Did

During this project I faced multiple issues, here’s how I fixed them step by step:

CORS Error

Problem: Frontend couldn’t call backend API (blocked by CORS).

Fix: Added proper CORS middleware in Express with origin: [frontendURL], credentials: true.

MongoDB Connection Error (0.0.0.0 issue)

Problem: Vercel backend couldn’t connect to MongoDB.

Fix: Updated MongoDB Atlas IP access to 0.0.0.0/0 and used the right connection string with user & password.

JWT Token Not Found

Problem: API was returning “Token Not Found” even though token was saved in localStorage.

Fix: Made sure axios sends Authorization: Bearer token in headers and enabled withCredentials: true.

Deployment Issues

Problem: Frontend and backend deployed separately but weren’t talking to each other.

Fix: Used environment variables (VITE_API_URL) in frontend, pointed them to the deployed Vercel backend.

These errors taught me how to handle real-world deployment problems, not just local dev issues. Now I know what to check first when APIs don’t talk properly — CORS, ENV, DB, and JWT flow.

📌 Notes

I’ve kept this project simple, but the base is strong enough to add Razorpay/Stripe integration in future.
