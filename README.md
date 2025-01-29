# 📝 Task Management Tool

![Task Management Tool](https://your-image-link.com) <!-- Optional: Add a banner image -->

## 🚀 Live Demo
🔗 [Task Management Tool](https://task-management-tool-one.vercel.app/login)

## 📌 Overview
Task Management Tool is a web application designed to help users efficiently manage their tasks with an intuitive and user-friendly interface. 
   
## 🎯 Features
- ✅ **User Authentication** (Google Sign-In via Firebase)
- 📋 **Task Management** (Add, Edit, Delete, and Drag & Drop Sorting)
- 📅 **Due Date Picker** using MUI Date Pickers
- 🔍 **Real-Time Updates** with Redux Toolkit
- 🎨 **Responsive UI** with Material UI & Tailwind CSS
- 🌍 **Secure Routing** with Protected Routes

## 🖥️ Tech Stack
| **Technology**   | **Description** |
|-----------------|---------------|
| **React.js** | Frontend framework |
| **Redux Toolkit** | State management |
| **Firebase Auth** | Google authentication |
| **Vite** | Fast development build tool |
| **MUI (Material UI)** | UI components |
| **Tailwind CSS** | Styling framework |
| **React Router** | Client-side routing |

## 📸 Screenshots
<!-- Add images if available -->
| Login Page | Dashboard |
|------------|------------|
| ![Login](https://your-image-link.com) | ![Dashboard](https://your-image-link.com) |

## 🛠️ Installation & Setup
Follow these steps to run the project locally:

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/task-management-tool.git
cd task-management-tool
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Add Firebase Configuration**
Create a `.env` file in the root directory and add your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### **4️⃣ Run the Project**
```sh
npm run dev
```
The application should now be running on `http://localhost:5173`.

## 🚀 Deployment
This project is deployed on **Vercel**.

### **Steps to Deploy**
1. Push your project to **GitHub**.
2. Connect your GitHub repo to **Vercel**.
3. Set up **Environment Variables** in **Vercel Dashboard → Settings**.
4. Deploy the project.

## 🎯 Usage
1. Sign in with **Google Authentication**.
2. Create, manage, and organize tasks using **drag & drop** functionality.
3. Securely access tasks with **protected routes**.

## 🔧 Troubleshooting
| **Issue** | **Solution** |
|-----------|-------------|
| `auth/unauthorized-domain` | Add your Vercel domain to **Firebase Authorized Domains**. |
| `auth/network-request-failed` | Check internet connection or **CORS settings**. |
| `auth/invalid-api-key` | Ensure `.env` file has the correct **Firebase API keys**. |

## 🤝 Contributing
We welcome contributions! To contribute:
1. Fork the repo.
2. Create a new branch (`feature/new-feature`).
3. Commit and push your changes.
4. Submit a Pull Request.

## 📜 License
This project is licensed under the **MIT License**.

## 📞 Contact
For any queries or support, reach out via:
- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- **GitHub**: [Your GitHub](https://github.com/yourusername)

---

### 🎉 **Enjoy using the Task Management Tool! 🚀**
