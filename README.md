# SkillSwap

SkillSwap is a full-stack web application that connects learners and teachers, allowing users to share and learn skills through an intuitive platform.

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Spring Security
- MySQL
- Swagger (OpenAPI)
- Maven

---

# Features

- User Registration
- User Login
- JWT Authentication
- Create Skills
- View All Skills
- Search Skills
- Filter Skills by Category
- Update Skills
- Delete Skills
- View Personal Skills
- Swagger API Documentation

---

# Project Structure

```
SkillSwap
│
├── skillswap-frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── src
│   ├── main
│   ├── test
│   └── resources
│
├── pom.xml
└── README.md
```

---

# Prerequisites

Before running the project, install:

- Java 21
- Node.js (18+ recommended)
- npm
- MySQL Server
- Git

---

# Clone the Repository

```bash
git clone https://github.com/nethrashivani/SkillSwap.git

cd SkillSwap
```

---

# Database Setup

Open MySQL Workbench and create the database.

```sql
CREATE DATABASE skillswap;
```

Open

```
src/main/resources/application.properties
```

Update your database credentials.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/skillswap
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

---

# Running the Backend

Open a terminal in the project root.

Run:

```bash
./mvnw spring-boot:run
```

Windows:

```powershell
.\mvnw spring-boot:run
```

---

## If Port 8080 is Already in Use

You may encounter:

```
Web server failed to start.
Port 8080 was already in use.
```

### Option 1 (Recommended)

Find the process.

```powershell
netstat -ano | findstr :8080
```

Kill it.

```powershell
taskkill /PID <PID> /F
```

---

### Option 2

Change the backend port.

Open

```
src/main/resources/application.properties
```

Add

```properties
server.port=8081
```

---

# Running the Frontend

Open another terminal.

```bash
cd skillswap-frontend
```

Install dependencies.

```bash
npm install
```

Run the frontend.

```bash
npm run dev
```

The application will be available at

```
http://localhost:5173
```

---

# IMPORTANT

If you changed the backend port to **8081**, update every backend API URL in the frontend.

Search for

```
http://localhost:8080
```

Replace with

```
http://localhost:8081
```

This includes:

- authService.js
- skillService.js
- axios.js (if present)
- any API utility file

Otherwise:

- Registration will fail
- Login will fail
- Skills won't load

---

# Swagger Documentation

After starting the backend, open

```
http://localhost:8080/swagger-ui/index.html
```

or

```
http://localhost:8081/swagger-ui/index.html
```

depending on your configured port.

---

# Default Flow

1. Start MySQL
2. Start Backend
3. Start Frontend
4. Register a user
5. Login
6. Create Skills
7. Search / Update / Delete Skills

---

# Common Issues

## Registration Failed

Possible causes:

- Backend not running
- Wrong backend URL
- Database not connected

Check:

```
application.properties
```

and

```
authService.js
```

---

## Skills Not Loading

Possible causes:

- Backend URL still points to port 8080
- JWT token not sent
- Backend not running

---

## Database Connection Error

Verify:

```properties
spring.datasource.username
spring.datasource.password
spring.datasource.url
```

Make sure MySQL is running.

---

## Maven Command Not Found

Use the Maven Wrapper.

Windows

```powershell
.\mvnw spring-boot:run
```

Linux/Mac

```bash
./mvnw spring-boot:run
```

---

## npm install Fails

Delete

```
node_modules
```

and

```
package-lock.json
```

Run

```bash
npm install
```

again.

---

## Swagger Not Opening

Ensure the backend has started successfully.

Look for:

```
Started SkillswapBackendApplication
```

---

# API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Skills

```
GET    /api/skills
GET    /api/skills/{id}
POST   /api/skills
PUT    /api/skills/{id}
DELETE /api/skills/{id}
GET    /api/skills/search
GET    /api/skills/category/{category}
GET    /api/skills/my
```

---

# Future Improvements

- Profile Pictures
- Skill Ratings
- Booking Sessions
- Chat System
- Notifications
- Docker Support
- CI/CD Pipeline
- Deployment

---

# Author

**M. S. Nethrashivani**
