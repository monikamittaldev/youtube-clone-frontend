# 🎬 YouTube Clone - Frontend

A modern, responsive YouTube Clone frontend built with **React.js**, **React Router**, and **Tailwind CSS**. The application replicates the core user experience of YouTube, including video browsing, playback, authentication, channel management, comments, and likes/dislikes, with a fully responsive UI and Dark/Light mode.

---

## 🎥 Demo

[![Watch the demo](./public/thumbnail.png)](https://youtu.be/KTzZs53c728)

Click the thumbnail above to watch the full demo video on YouTube.

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Persistent Login

### 🎥 Videos
- Home Feed
- Video Details Page
- Video Player (ReactPlayer)
- Upload Videos
- Edit Videos
- Delete Videos
- Like & Dislike Videos
- View Count
- Search Videos
- Category Filtering

### 📺 Channels
- Create Channel
- Edit Channel
- Upload Avatar
- Upload Banner
- Channel Video Management (Add/Edit/Delete)

### 💬 Comments
- Add Comments
- Edit Comments
- Delete Comments

### 🎨 UI/UX
- Responsive Design
- Dark Mode
- Light Mode
- Toast Notifications
- Skeleton Loading
- Mobile Friendly
- Modern Material-inspired Design

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- React Player
- React Custom Toast
- Vite 

---

## 📁 Folder Structure

```
src/
│
├── components/
│   ├── Channel/       ← Channel header, video card, upload/edit modal
│   ├── Header/        ← Top nav, search, sign-in button
│   ├── Home/           ← Category pills, video card, skeleton loader
│   ├── SideSlider/     ← Toggleable sidebar
│   ├── watch/          ← Comments, related videos
│   ├── Context/        ← Theme (Dark/Light) context
│   ├── Toast.jsx
│   ├── ToastContainer.jsx
│   ├── ConfirmDialog.jsx
│   └── PageLoader.jsx
├── hooks/               ← useFetch, usePost, usePut, useDelete, useIsMobile
├── pages/               ← HomePage, VideoWatchPage, AuthPage, ChannelPage, CreateChannelPage, NotFound
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/monikamittaldev/youtube-clone-frontend.git
```

Navigate into the project

```bash
cd youtube-clone-frontend
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

The application will be available at

```
http://localhost:5173
```

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add your feature"
```

4. Push to the branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

## 🐞 Known Issues

- YouTube embedded videos may have browser-specific restrictions.
- Upload progress depends on backend implementation.
- Some features require backend authentication.

---

## 📄 License

This project is developed for educational and portfolio purposes.

---

## 👩‍💻 Author

**Monika**

Full Stack Developer

### Connect with me

- LinkedIn: https://www.linkedin.com/in/monikamittal28/
- GitHub: https://github.com/monikamittaldev

---

⭐ If you like this project, don't forget to give it a star!