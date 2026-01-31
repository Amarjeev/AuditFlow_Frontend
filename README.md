# 🧾 AuditFlow – Smart Reconciliation & Audit System

AuditFlow is a full-stack MERN application built to handle large-scale transaction reconciliation with complete audit tracking, role-based access control, and performance-focused architecture.  
This project was developed as part of a **Smart Reconciliation & Audit System** assignment.

---

## 🔗 Live Application

- **Frontend (Vercel):**  
  https://audit-flow-frontend.vercel.app/

- **Backend:** Hosted on Render

---

## 📘 API Documentation

Public Postman API documentation:
👉 https://documenter.getpostman.com/view/43720226/2sBXVoA8No

---


## 🧩 Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript
- MVC Architecture

### Database & Caching
- MongoDB Atlas
- Redis (Caching)

### Authentication & Security
- JWT Access Token
- Refresh Token
- Role-based Authorization

### File Handling
- Multer (File Uploads)

### Third-Party Libraries
- Axios
- Express Validator
- Redis
- MongoDB Atlas

---

## 👥 User Roles & Permissions

AuditFlow supports **three user roles**, with role enforcement applied on both frontend and backend.

### 🔑 Admin
- Login using mobile number and password
- Upload transaction files
- View total data summary
- View filtered charts
- View complete audit logs
- Detect live mismatches
- Line-by-line error display in tables
- Delete uploaded files
- Create Analyst and Viewer accounts with passwords
- View all job-related data

### 🧠 Analyst
- Upload transaction files
- View live line-by-line validation errors
- View audit logs for own uploaded data only
- View charts and total data summary
- Delete only self-created upload jobs

### 👀 Viewer
- Read-only access
- View overall data summary
- View filtered charts
- No upload or delete permissions

---

## 🔐 Demo Admin Credentials
[ Mobile Number: 9876543210 ]  
[ Password: 123456 ]


---

## 📤 File Upload & Processing

- Supports Excel file uploads
- File handling implemented using Multer
- Each uploaded file generates a **unique data-based identifier**
  - The identifier is created using file metadata and content signature
  - This unique ID is used to **detect duplicate file uploads**
- If the same file is uploaded multiple times, the system:
  - Prevents duplicate data creation
  - Reuses existing reconciliation results (idempotent behavior)
- Asynchronous, non-blocking processing for improved performance
- Redis caching used to optimize frequently accessed data
- Live mismatch detection with line-by-line validation

---

## 📊 Features Implemented

### ✔ Core Features
- Role-based authentication (Admin, Analyst, Viewer)
- JWT + Refresh token authentication
- Reconciliation dashboard with charts
- Full audit trail for all data changes
- Live mismatch detection
- Line-by-line error visualization
- Upload job deletion with permission validation
- MVC-based backend architecture

### 🚀 Performance & Optimization
- Redis caching for faster API responses
- Infinite scrolling for large datasets
- Optimized backend queries
- Improved UI responsiveness

---

## 📁 Sample Data

Two dummy Excel files are included for testing and demo purposes:

- 📄 **Sample Transactions File 1**  
  👉 https://docs.google.com/spreadsheets/d/1H_fjLU7f6cUSFyhtpxwtjxz2anjdxSZt/edit?usp=drivesdk&ouid=106880901960114180224&rtpof=true&sd=true

- 📄 **Sample Transactions File 2**  
  👉 https://docs.google.com/spreadsheets/d/1xw9oVSWeFHo2zhU43I7j3x6iBmjRES4w/edit?usp=drivesdk&ouid=106880901960114180224&rtpof=true&sd=true


---

## 🔮 Planned Improvements & Future Enhancements

Due to time constraints, the following improvements are planned and under research:

- API response compression middleware
- Advanced security measures to prevent cyber attacks
- Research on efficient data storage strategies
- Further code optimization and refactoring
- User profile update functionality
- Password change feature
- OTP-based authentication
- Additional performance tuning for large data volumes

---

## 📐 Architecture Overview

- Follows MVC architecture
- Clear separation of Controllers, Services, and Models
- Dedicated Audit Logs collection
- Redis used for caching and performance optimization
- Secure authentication and authorization layers

---

## 🙏 Acknowledgement

Due to the limited deadline, some performance optimizations are still in progress and will be improved incrementally.

Thank you for the opportunity to work on this assignment.

— **AuditFlow**

