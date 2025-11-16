# ONEST Network Integration Platform

A login and registration system for KLE Tech students on the ONEST network platform.

## Features

- User Registration with student ID validation
- Secure Login with JWT authentication
- Password hashing using bcrypt
- MongoDB database integration
- Modern, responsive UI design
- RESTful API endpoints

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env`:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/onest_platform
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     ```

4. Make sure MongoDB is running:
   - If using local MongoDB: Start your MongoDB service
   - If using MongoDB Atlas: Update `MONGODB_URI` in `.env` with your connection string

## Running the Application

1. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

2. Open your browser and navigate to:
   - Login: `http://localhost:3000/`
   - Register: `http://localhost:3000/register`

## API Endpoints

### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "studentId": "STU001",
  "email": "student@kletech.ac.in",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "studentId": "STU001",
    "email": "student@kletech.ac.in",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "student@kletech.ac.in",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "studentId": "STU001",
    "email": "student@kletech.ac.in",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

## Project Structure

```
.
├── server.js              # Main Express server file
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
├── models/
│   └── User.js           # User model/schema
├── routes/
│   └── auth.js           # Authentication routes
└── public/
    ├── login.html        # Login page
    ├── register.html     # Registration page
    ├── styles.css        # Styling
    └── auth.js           # Frontend JavaScript
```

## Security Features

- Passwords are hashed using bcrypt before storing in database
- JWT tokens for secure authentication
- Input validation on both client and server side
- CORS enabled for cross-origin requests

## Notes

- Make sure to change the `JWT_SECRET` in production
- Use a strong, unique secret key for JWT
- Consider adding rate limiting for production use
- Add HTTPS in production environment

## License

ISC


