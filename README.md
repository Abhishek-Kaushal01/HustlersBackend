# HustlersBackend

A Node.js Express-based backend application for the Hustlers platform.

## Overview

HustlersBackend is a RESTful API built with **Express.js** and **MongoDB**, providing robust authentication, email services, and data management capabilities.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.1.0
- **Database:** MongoDB (via Mongoose 8.16.3)
- **Authentication:** JSON Web Tokens (JWT), bcryptjs for password hashing
- **Email Service:** Nodemailer
- **Other:** CORS, Compression, dotenv for environment management

## Features

- 🔐 **Secure Authentication** - JWT-based authentication with bcryptjs password hashing
- 🗄️ **MongoDB Integration** - Persistent data storage with Mongoose ODM
- 📧 **Email Support** - Built-in email notifications via Nodemailer
- 🔄 **CORS Enabled** - Cross-origin resource sharing support
- 📦 **Compression** - Response compression for optimized performance
- 🔑 **Environment Configuration** - Secure environment variable management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance
- A `.env` file with required configuration

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhishek-Kaushal01/HustlersBackend.git
   cd HustlersBackend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Add your configuration (MongoDB URI, JWT secret, email credentials, etc.)
   ```
   MONGODB_URI=mongodb://your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-email-password
   PORT=5000
   ```

## Usage

**Start the server**
```bash
npm start
```

The server will run on the specified PORT (default: 5000)

**Run tests** (when tests are added)
```bash
npm test
```

## Project Structure

```
HustlersBackend/
├── server.js           # Main application entry point
├── package.json        # Project dependencies and metadata
├── .env               # Environment variables (not committed)
└── README.md          # This file
```

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.1.0 | Web framework |
| mongoose | ^8.16.3 | MongoDB ODM |
| jsonwebtoken | ^9.0.2 | JWT authentication |
| bcryptjs | ^3.0.2 | Password hashing |
| nodemailer | ^7.0.5 | Email service |
| cors | ^2.8.5 | CORS middleware |
| compression | ^1.8.1 | Response compression |
| dotenv | ^17.2.0 | Environment variable management |

## API Endpoints

*(Add your API routes documentation here)*

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `PORT` - Server port (default: 5000)
- `EMAIL_USER` - Email address for nodemailer
- `EMAIL_PASSWORD` - Email password/app password
- `NODE_ENV` - Environment (development/production)

## Security Considerations

- ✅ Store sensitive data in `.env` file (never commit to git)
- ✅ Use environment variables for configuration
- ✅ Implement proper JWT token expiration
- ✅ Use bcryptjs for password hashing (already included)
- ✅ Enable CORS only for trusted origins in production

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

Abhishek Kaushal

## Support

For issues and questions, please open an issue on the [GitHub repository](https://github.com/Abhishek-Kaushal01/HustlersBackend).

---

**Last Updated:** July 2026
