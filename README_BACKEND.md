# GuardFlex Backend API

## 🚀 Quick Start

### Development Mode

```bash
# Install dependencies
npm install

# Start Express server
npm run server

# Or with auto-reload
npm run server:dev
```

Server will run on `http://localhost:3001`

## 📁 Project Structure

```
├── api/                    # Vercel Serverless Functions
│   ├── products.js        # Products API endpoint
│   └── contact.js         # Contact form endpoint
├── server/                # Express Backend
│   └── routes/
│       ├── products.js    # Products routes
│       ├── contact.js     # Contact routes
│       └── admin.js       # Admin routes
├── server.js              # Express server entry point
└── .env.example           # Environment variables template
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=Sonnenschutz` - Filter by category
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Contact
- `POST /api/contact` - Submit contact form

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/settings` - Get admin settings
- `PUT /api/admin/settings` - Update admin settings

### Health Check
- `GET /api/health` - Server health status

## 🔧 Configuration

1. Copy `.env.example` to `.env`
2. Configure your environment variables:
   - `PORT` - Server port (default: 3001)
   - `MONGODB_URI` - MongoDB connection string (optional)
   - `EMAIL_*` - Email configuration (optional)
   - `JWT_SECRET` - JWT secret for authentication (optional)

## 📦 Deployment

### Vercel Serverless Functions
- Functions in `/api` folder are automatically deployed to Vercel
- No additional configuration needed

### Express Backend (Separate Deployment)
- Deploy to services like Railway, Render, or Heroku
- Set environment variables in your hosting platform
- Update frontend API URLs to point to your backend

## 🔐 Authentication (TODO)
- Currently using hardcoded credentials
- Will be replaced with JWT authentication
- Admin routes will require authentication middleware

## 💾 Database (TODO)
- Currently using static data from `src/data/products.js`
- Will be migrated to MongoDB or PostgreSQL
- Database models and schemas to be added

## 📧 Email Integration (TODO)
- Contact form submissions will be sent via email
- Configure email service in `.env`

