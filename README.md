# 🔐 SecureAuth - Premium Authentication System

A beautiful, highly secure, and modern authentication system built with Node.js, Express, MongoDB, and vanilla JavaScript. Featuring a sleek dark-mode design with glassmorphism and advanced security features.

## ✨ Latest Features

- **User Registration** - Create new accounts with email and name verification.
- **User Login** - Secure login with JWT token-based authentication.
- **Password Visibility Toggle** 👁️ - Interactive eye icon to show/hide passwords while typing.
- **Hidden Reset Tokens** 🛡️ - Seamless, automatic password reset flow where tokens are handled securely in the background.
- **Privacy-First Dashboard** 👤 - Clean dashboard showing only essential user info (Name/Email), hiding technical session tokens from the UI.
- **Premium Dark UI** 🌑 - High-contrast design with pure white icons and deep navy aesthetics.
- **Modern Micro-animations** ✨ - Smooth transitions, button ripple effects, and dynamic SVGs.
- **Responsive Design** 📱 - Optimized for mobile, tablet, and desktop views.
- **Toast Notifications** 🍞 - Elegant, color-coded feedback for all user actions.

## 🚀 Tech Stack

### Backend
- **Node.js & Express.js** - Robust server-side framework.
- **MongoDB & Mongoose** - Multi-region database support and object modeling.
- **JWT (JSON Web Tokens)** - Secure stateless authentication.
- **bcryptjs** - Industry-standard password hashing (10 salt rounds).
- **dotenv** - Environment variable management.

### Frontend
- **HTML5 & Vanilla CSS3** - Modern styling with gradients, glassmorphism, and custom properties.
- **Vanilla JavaScript (ES6+)** - Reactive UI handling without heavy frameworks.
- **Google Fonts (Inter)** - Premium typography.
- **Custom Branding** 🗡️ - Integrated logo and favicon system.

## 📦 Installation

1. **Clone the repository**
   ```bash
   cd auth-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running**
   ```bash
   # Default local connection: mongodb://127.0.0.1:27017/authDB
   mongod
   ```

4. **Environment Configuration**
   - Locate the `.env` file in the root directory.
   - Default settings are provided for local development.

## 🎯 Usage

1. **Run Development Server**
   ```bash
   npm run dev
   ```

2. **Access the App**
   - Open `http://localhost:5000` in your browser.

3. **Experience the Flow**
   - **Register**: Create an account with a secure password.
   - **Login**: Use your credentials to enter the dashboard.
   - **Reset**: Use "Forgot Password" to verify your email. The system now automatically handles the reset token—just enter your new password when prompted!

## 📁 Project Structure

```
auth-system/
├── server.js              # Express server & Middleware
├── .env                   # Environment secrets
├── package.json           # Scripts & Dependencies
├── models/
│   └── User.js           # Mongoose User Schema
├── routes/
│   └── auth.js           # API Endpoints (Sign-in, Register, Reset)
└── public/               # Frontend Assets
    ├── assets/           # Images & Icons (favicon)
    ├── index.html        # Main Entry Point
    ├── styles.css        # Premium Design System
    └── script.js         # Client-side UI Logic
```

## 🔌 API Endpoints

### 1. Register User
`POST /api/auth/register`
- **Body**: `{ name, email, password }`
- **Success**: Creates a new user and returns success message.

### 2. Login User
`POST /api/auth/login`
- **Body**: `{ email, password }`
- **Success**: Returns `{ token, user: { id, name, email } }`.

### 3. Forgot Password
`POST /api/auth/forgot-password`
- **Body**: `{ email }`
- **Success**: Generates token and returns `{ message, resetToken }`.

### 4. Reset Password
`POST /api/auth/reset-password/:token`
- **Body**: `{ password }`
- **Success**: Updates password and invalidates token.

## 🎨 Professional Design System

- **Color Palette**: Dark Navy (`#0f0f23`), Radiant Purple-Blue (`#667eea` to `#764ba2`), and Pure White (`#ffffff`) for high readability.
- **Glassmorphism**: 20px blur effects on cards for a premium "frosted glass" feel.
- **Advanced Inputs**: 
  - Dark-mode inputs (`#0a0a1a`) with forced high-contrast white icons.
  - Custom browser autofill styling for visual consistency.
  - Absolute-positioned utility buttons (Eye Toggle).
- **Animations**: CSS `@keyframes` for floating background orbs and smooth fade-in/up entry effects.

## 🔒 Security Best Practices

- **Hidden Tokens**: Tokens are stored in `localStorage` or `sessionStorage` but are suppressed from the UI to prevent shoulder-surfing and improve security.
- **Hashing**: Passwords never touch the database in plain text.
- **Expirations**: Both authentication and reset tokens expire after 1 hour for maximum safety.
- **JWT Protection**: All sensitive API routes are intended to be protected via JWT verification.

## 🐛 Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **MongoDB Connection** | Verify `MONGO_URI` in `.env` and ensure `mongod` is running. |
| **Icons Not White** | Clear browser cache (Ctrl+F5) to reload latest CSS. |
| **Port Collision** | Change `PORT` in `.env` to 3000 or 8080. |

---

**Built with pride for high-performance authentication. 🎉**
