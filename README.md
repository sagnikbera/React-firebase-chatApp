# 💬 ChatApp - Real-Time Messaging Platform

A modern, responsive, and real-time messaging application built with **React**, **Firebase**, and **Tailwind CSS**. This application allows users to search for friends, chat in real-time, and share media seamlessly.

## ✨ Features

* **Real-Time Messaging**: Instant message delivery using Firebase Firestore `onSnapshot` listeners.
* **User Authentication**: Secure Login and Sign-up using Firebase Authentication, including Google Login support.
* **Media Sharing**: Capability to upload and send images directly in chats via Cloudinary integration.
* **Global State Management**: Uses React Context API to manage user data, chat lists, and active conversations.
* **Responsive UI**: A fully responsive layout that switches between a sidebar list and an active chat view on mobile devices.
* **Online Presence**: Real-time "Green Dot" status indicators based on a `lastSeen` timer logic.
* **Message Seen Status**: Visual indicators to show if a message has been read by the recipient.
* **Password Recovery**: Integrated password reset functionality via email.

## 🚀 Tech Stack

* **Frontend**: React.js, Tailwind CSS
* **Icons**: React Icons (Io, Fa, Md, Im)
* **Backend**: Firebase (Auth, Firestore)
* **Storage**: Cloudinary (for Media/Images)
* **Notifications**: React-Toastify for real-time alerts

## 🛠️ Installation & Setup

1.  **Clone the Repository**:
    ```bash
    git clone [https://github.com/sagnikbera/React-firebase-chatApp](https://github.com/sagnikbera/React-firebase-chatApp.git)
    cd React-firebase-chatApp
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory and add your Firebase and Cloudinary credentials:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_CLOUDINARY_URL=your_cloudinary_url
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## 📸 Project Structure

* `src/components`: Contains Sidebar, ChatBox, and RightSidebar components.
* `src/context`: AppContext for managing global user and chat states.
* `src/config`: Firebase initialization and authentication logic.
* `src/pages`: Main pages like Login, Profile, and Chat.

## 🌐 Deployment

[*VERCEL*](https://x-chat-app.vercel.app/)

## 📄 License

This project is licensed under the MIT License.
