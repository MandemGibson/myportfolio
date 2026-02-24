# Quick Setup Guide

## 1. Database Setup
Create a `.env` file in the root directory with your actual values:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Admin API Key for authentication
ADMIN_API_KEY="your_secret_admin_key"
```

## 2. Run Migrations

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Seed initial data
npm run db:seed
```

## 3. Start Development Server

```bash
npm run dev
```

## What's Been Set Up

### ✅ Cloudinary Integration
- Image upload utility functions in `src/lib/cloudinary.ts`
- Automatic image optimization and transformation
- Support for projects, profiles, and tech logos

### ✅ Database Schema Updated
- `Profile` model: Added `avatar` and `avatarPublicId` fields
- `Project` model: Added `imagePublicId` field
- `Skill` model: Added `logo` and `publicId` fields

### ✅ API Endpoints Created

**Image Upload:**
- `POST /api/upload` - Upload general images
- `POST /api/upload/tech-logo` - Upload tech stack logos
- `DELETE /api/upload` - Delete images

**Profile:**
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile with avatar

**Skills:**
- `GET /api/skills` - Get all skills with logos
- `POST /api/skills` - Create skill
- `PUT /api/skills` - Update skill
- `DELETE /api/skills?id=X` - Delete skill

**Projects:**
- `GET /api/portfolio/projects` - Get all projects
- `GET /api/portfolio/projects/[id]` - Get single project
- `POST /api/portfolio/projects` - Create project
- `PUT /api/portfolio/projects/[id]` - Update project
- `DELETE /api/portfolio/projects/[id]` - Delete project

### ✅ Authentication
- API key authentication for all write operations
- Use `x-api-key` header with your admin key

### ✅ Features
- Automatic old image deletion when updating
- Image optimization (size, quality, format)
- Tech logo specific folder and sizing
- Error handling and validation
- TypeScript support

## Complete Documentation

See [BACKEND_API.md](./BACKEND_API.md) for:
- Detailed API documentation
- Request/response examples
- Authentication guide
- Testing with cURL
- Complete workflow examples
