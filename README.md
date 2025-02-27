# Task Manager - Full Stack Web Application

## Overview
The **Task Manager** is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows users to manage tasks based on their roles (Admin, HR, Employee). The application includes features like user authentication, role-based access control, task creation, task management, and task status tracking.

---

## Features
1. **User Authentication**:
   - Login with JWT (JSON Web Tokens) for secure authentication.
   - Role-based access control (Admin, HR, Employee).

2. **Role-Based Dashboards**:
   - **Admin Dashboard**: Create tasks, manage submitted tasks (accept/reject).
   - **HR Dashboard**: Create new users, view tasks.
   - **Employee Dashboard**: Accept tasks, update task status (new → active → submitted).

3. **Task Management**:
   - Task status: `new_task`, `active_task`, `submitted_task`, `completed_task`.
   - Only Admin can create tasks and manage submitted tasks.
   - Employees can accept tasks and submit them.

4. **API Endpoints**:
   - Authentication: `api/auth` (login, register, etc.).
   - Tasks: `api/tasks` (create, update, delete, etc.).

5. **State Management**:
   - Redux Toolkit for global state management.
   - Redux Thunk for handling asynchronous actions (e.g., fetching data).

6. **Database**:
   - MongoDB for storing user and task data.

---

## Technologies Used
- **Frontend**:
  - React.js
  - Redux Toolkit
  - Redux Thunk
  - Tailwind CSS (for styling)
  - Axios (for API calls)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose for schema modeling)
  - JSON Web Tokens (JWT) for authentication
  - Bcrypt.js for password hashing

- **Tools**:
  - Postman (for API testing)
  - Git (for version control)

---

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud-based)
- Git

### Steps to Run the Application

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/abhisheks7070/task_manager_frontend
   npm i

2. **create your .env file**:
  VITE_AUTH_URL= "your url"
  VITE_TASKS_URL= "your url"

3. **backend application link**:
  ```bash
   git clone https://github.com/abhisheks7070/task_manager_backend


