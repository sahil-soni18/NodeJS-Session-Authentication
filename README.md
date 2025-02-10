# Session Authentication with Express.js

## Overview
This repository demonstrates **session-based authentication** using **Express.js** and **express-session**. Unlike JWT, which is stateless, session-based authentication maintains user login sessions on the server.

## Features
- User **login** with session creation
- **Protected route** that requires authentication
- User **logout** with session destruction
- **Testing** with Jest & Supertest

## Tech Stack
- **Node.js** & **Express.js** (Backend)
- **express-session** (Session management)
- **Supertest & Jest** (Testing framework)

## Installation
Clone the repository:
```sh
git clone <repository-url>
cd session-authentication
```

Install dependencies:
```sh
npm install
```

## Usage
### Start the Server
```sh
npm start
```
Server runs on `http://localhost:3000`

### API Endpoints
#### 1️⃣ **User Login**
```http
POST /login
```
**Request Body:**
```json
{
  "username": "user1"
}
```
**Response:**
```json
{
  "message": "Login successful"
}
```

#### 2️⃣ **Access Protected Dashboard**
```http
GET /dashboard
```
**Response (If logged in):**
```json
{
  "message": "Welcome user1"
}
```
**Response (If not logged in):**
```json
{
  "message": "Unauthorized"
}
```

#### 3️⃣ **User Logout**
```http
POST /logout
```
**Response:**
```json
{
  "message": "Logged out"
}
```

## Testing
Run tests using Jest:
```sh
npm test
```

## License
This project is licensed under the MIT License.

