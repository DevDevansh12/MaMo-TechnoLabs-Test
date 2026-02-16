# Admin Login Setup Guide

## Installation

Run this command to install the required session package:

```cmd
npm install
```

## Admin Credentials

- **Email:** admin@gmail.com
- **Password:** admin@123

## Routes

- **Login Page:** http://localhost:3000/admin/login
- **Admin Dashboard:** http://localhost:3000/admin/dashboard (protected)
- **Logout:** http://localhost:3000/admin/logout

## Features

✅ Session-based authentication
✅ Protected admin routes
✅ Auto-redirect if already logged in
✅ Logout functionality
✅ 24-hour session expiry
✅ Login error messages

## Security Notes

⚠️ In production:
- Use environment variables for credentials
- Hash passwords with bcrypt
- Use HTTPS
- Add CSRF protection
- Implement rate limiting

## Usage

1. Start your server: `npm start`
2. Visit: http://localhost:3000/admin/login
3. Login with the credentials above
4. Access the protected dashboard
5. Logout when done

## How It Works

- Trying to access `/admin/dashboard` without login redirects to login page
- After successful login, session is created
- Session lasts 24 hours
- Logout destroys the session
