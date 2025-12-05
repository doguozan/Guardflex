# GuardFlex Database Setup Guide

## 🗄️ MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create a new cluster (Free tier available)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `guardflex`

3. **Set Environment Variable**
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/guardflex?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB

1. **Install MongoDB**
   - Download from https://www.mongodb.com/try/download/community
   - Install and start MongoDB service

2. **Set Environment Variable**
   ```bash
   MONGODB_URI=mongodb://localhost:27017/guardflex
   ```

## 🔧 Configuration

1. **Create `.env` file** (copy from `.env.example`):
   ```bash
   PORT=3001
   MONGODB_URI=your-mongodb-connection-string-here
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

## 🌱 Seed Database

Run the seeding script to populate database with initial data:

```bash
npm run seed
```

This will:
- ✅ Import all products from `src/data/products.js`
- ✅ Create default admin user (username: `GuardFlex`, password: `GuardFlex2025`)
- ✅ Create default site settings

## 📊 Database Models

### Product
- `id` (String, unique)
- `name` (String)
- `category` (Enum: Insektenschutz, Sonnenschutz, Plissee)
- `image` (String)
- `features` (Array of Strings)
- `description` (String)
- `createdAt`, `updatedAt` (Auto-generated)

### Contact
- `name` (String)
- `email` (String, validated)
- `phone` (String, optional)
- `subject` (String, optional)
- `message` (String)
- `status` (Enum: new, read, replied, archived)
- `ipAddress` (String)
- `createdAt`, `updatedAt` (Auto-generated)

### Admin
- `username` (String, unique)
- `password` (String, hashed)
- `email` (String, unique)
- `role` (Enum: admin, superadmin)
- `lastLogin` (Date)
- `createdAt`, `updatedAt` (Auto-generated)

### Settings
- `siteName` (String)
- `contactInfo` (Object)
- `hero` (Object)
- `socialMedia` (Object)
- `createdAt`, `updatedAt` (Auto-generated)

## 🚀 Usage

### Start Server
```bash
npm run server
```

### API Endpoints

**Products:**
- `GET /api/products` - Get all products
- `GET /api/products?category=Sonnenschutz` - Filter by category
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

**Contact:**
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (admin)
- `GET /api/contact/:id` - Get single submission (admin)
- `PUT /api/contact/:id` - Update status (admin)

**Admin:**
- `POST /api/admin/login` - Admin login
- `GET /api/admin/settings` - Get settings
- `PUT /api/admin/settings` - Update settings

## 🔐 Default Admin Credentials

- **Username:** `GuardFlex`
- **Password:** `GuardFlex2025`

⚠️ **Change these credentials in production!**

## 📝 Notes

- All timestamps are automatically managed by Mongoose
- Passwords are hashed using bcrypt
- Text search is enabled on Product model
- Indexes are created for faster queries

