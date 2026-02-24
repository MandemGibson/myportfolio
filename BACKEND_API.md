# Backend API Documentation

## Cloudinary Setup

### Environment Variables

Add these to your `.env` file (see `.env.example`):

```env
DATABASE_URL="your_postgresql_url"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Admin API Key for authentication
ADMIN_API_KEY="your_secret_admin_key"
```

### Getting Cloudinary Credentials

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Add them to your `.env` file

## API Endpoints

### Authentication
All write operations (POST, PUT, DELETE) require authentication via the `x-api-key` header:

```bash
x-api-key: your_secret_admin_key
```

---

### Image Upload

#### Upload General Image
**POST** `/api/upload`

Upload any image to Cloudinary.

**Headers:**
```
x-api-key: your_secret_admin_key
Content-Type: multipart/form-data
```

**Body (FormData):**
- `file` (File): Image file
- `folder` (string, optional): Folder name in Cloudinary (default: "portfolio")

**Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/...",
  "publicId": "portfolio/abc123"
}
```

**Example (JavaScript):**
```javascript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('folder', 'portfolio/projects');

const response = await fetch('/api/upload', {
  method: 'POST',
  headers: {
    'x-api-key': 'your_secret_admin_key',
  },
  body: formData,
});

const data = await response.json();
console.log(data.url); // Use this URL in your project
```

#### Upload Tech Stack Logo
**POST** `/api/upload/tech-logo`

Upload a tech stack logo with automatic sizing and naming.

**Headers:**
```
x-api-key: your_secret_admin_key
Content-Type: multipart/form-data
```

**Body (FormData):**
- `file` (File): Image file
- `techName` (string): Name of the technology (e.g., "React", "Node.js")
- `skillId` (string, optional): Skill ID to update in database

**Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/...",
  "publicId": "portfolio/tech-logos/react"
}
```

**Example:**
```javascript
const formData = new FormData();
formData.append('file', logoFile);
formData.append('techName', 'React');
formData.append('skillId', '1');

const response = await fetch('/api/upload/tech-logo', {
  method: 'POST',
  headers: {
    'x-api-key': 'your_secret_admin_key',
  },
  body: formData,
});
```

#### Delete Image
**DELETE** `/api/upload`

Delete an image from Cloudinary.

**Headers:**
```
x-api-key: your_secret_admin_key
Content-Type: application/json
```

**Body:**
```json
{
  "publicId": "portfolio/abc123"
}
```

---

### Profile

#### Get Profile
**GET** `/api/profile`

Get user profile information.

**Response:**
```json
{
  "id": 1,
  "name": "Philip Gibson Cudjoe",
  "title": "Full Stack Developer",
  "email": "philipgibsoncudjoe@gmail.com",
  "linkedin": "https://linkedin.com/in/...",
  "github": "https://github.com/...",
  "twitter": "https://x.com/...",
  "bio": "Building modern web applications...",
  "location": "Ghana",
  "availability": "Available for new opportunities",
  "avatar": "https://res.cloudinary.com/...",
  "avatarPublicId": "portfolio/avatar/profile"
}
```

#### Update Profile
**PUT** `/api/profile`

Update profile information with optional avatar.

**Headers:**
```
x-api-key: your_secret_admin_key
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Philip Gibson Cudjoe",
  "title": "Full Stack Developer",
  "email": "philipgibsoncudjoe@gmail.com",
  "bio": "Building modern web applications...",
  "avatar": "https://res.cloudinary.com/...",
  "avatarPublicId": "portfolio/avatar/profile"
}
```

---

### Skills

#### Get All Skills
**GET** `/api/skills`

Get all skills grouped by category with logos.

**Response:**
```json
{
  "frontend": [
    {
      "id": 1,
      "name": "React",
      "logo": "https://res.cloudinary.com/...",
      "publicId": "portfolio/tech-logos/react"
    }
  ],
  "backend": [...],
  "tools": [...]
}
```

#### Create Skill
**POST** `/api/skills`

Create a new skill.

**Headers:**
```
x-api-key: your_secret_admin_key
Content-Type: application/json
```

**Body:**
```json
{
  "name": "React",
  "category": "frontend",
  "logo": "https://res.cloudinary.com/...",
  "publicId": "portfolio/tech-logos/react"
}
```

#### Update Skill
**PUT** `/api/skills`

Update an existing skill.

**Headers:**
```
x-api-key: your_secret_admin_key
Content-Type: application/json
```

**Body:**
```json
{
  "id": 1,
  "name": "React",
  "category": "frontend",
  "logo": "https://res.cloudinary.com/...",
  "publicId": "portfolio/tech-logos/react"
}
```

#### Delete Skill
**DELETE** `/api/skills?id=1`

Delete a skill (also deletes associated Cloudinary image).

**Headers:**
```
x-api-key: your_secret_admin_key
```

---

### Projects

#### Get All Projects
**GET** `/api/portfolio/projects`

Get all projects.

**Response:**
```json
[
  {
    "id": 1,
    "title": "E-Commerce Platform",
    "description": "Full-stack e-commerce solution",
    "tech": ["Next.js", "Node.js", "PostgreSQL"],
    "liveUrl": "https://example.com",
    "githubUrl": "https://github.com/...",
    "image": "https://res.cloudinary.com/...",
    "imagePublicId": "portfolio/projects/ecommerce",
    "status": "Live",
    "type": "Full Stack",
    "featured": true,
    "preview": "A comprehensive e-commerce platform..."
  }
]
```

#### Get Single Project
**GET** `/api/portfolio/projects/[id]`

Get a specific project by ID.

#### Create Project
**POST** `/api/portfolio/projects`

Create a new project.

**Headers:**
```
x-api-key: your_secret_admin_key
Content-Type: application/json
```

**Body:**
```json
{
  "title": "E-Commerce Platform",
  "description": "Full-stack e-commerce solution",
  "tech": ["Next.js", "Node.js", "PostgreSQL"],
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/...",
  "image": "https://res.cloudinary.com/...",
  "imagePublicId": "portfolio/projects/ecommerce",
  "status": "Live",
  "type": "Full Stack",
  "featured": true,
  "preview": "A comprehensive e-commerce platform..."
}
```

**Complete Workflow Example:**
```javascript
// 1. Upload project image
const formData = new FormData();
formData.append('file', projectImageFile);
formData.append('folder', 'portfolio/projects');

const uploadRes = await fetch('/api/upload', {
  method: 'POST',
  headers: { 'x-api-key': 'your_secret_admin_key' },
  body: formData,
});

const { url, publicId } = await uploadRes.json();

// 2. Create project with image URL
const projectRes = await fetch('/api/portfolio/projects', {
  method: 'POST',
  headers: {
    'x-api-key': 'your_secret_admin_key',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My New Project',
    description: 'Description here',
    tech: ['React', 'Node.js'],
    image: url,
    imagePublicId: publicId,
    status: 'Live',
    featured: true,
  }),
});
```

#### Update Project
**PUT** `/api/portfolio/projects/[id]`

Update an existing project (automatically deletes old image if new one is provided).

**Headers:**
```
x-api-key: your_secret_admin_key
Content-Type: application/json
```

#### Delete Project
**DELETE** `/api/portfolio/projects/[id]`

Delete a project (also deletes associated Cloudinary image).

**Headers:**
```
x-api-key: your_secret_admin_key
```

---

### Portfolio (Legacy - All Data)

#### Get All Portfolio Data
**GET** `/api/portfolio`

Get all portfolio data including profile, skills, projects, etc.

**Response:**
```json
{
  "profile": {...},
  "skills": {...},
  "projects": [...],
  "experience": [...],
  "education": [...],
  "certifications": [...],
  "stats": [...]
}
```

---

## Database Migrations

After updating the schema, run:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Or create migration
npm run db:migrate
```

## Image Optimization

Cloudinary automatically optimizes images:
- Projects: Max 1200x800px
- Tech Logos: Max 200x200px
- Profile Avatars: Max 1200x800px
- Auto quality optimization
- Auto format selection (WebP where supported)

## Security Notes

1. **Always use HTTPS** in production
2. **Keep ADMIN_API_KEY secret** - never commit to git
3. **Validate file types** on frontend and backend
4. **Set file size limits** in your frontend
5. **Use environment variables** for all sensitive data

## Error Handling

All endpoints return standard error responses:

```json
{
  "error": "Error message here"
}
```

HTTP Status Codes:
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid API key)
- `404` - Not Found
- `500` - Server Error

## Testing with cURL

```bash
# Upload image
curl -X POST http://localhost:3000/api/upload \
  -H "x-api-key: your_secret_admin_key" \
  -F "file=@/path/to/image.jpg" \
  -F "folder=portfolio/projects"

# Create project
curl -X POST http://localhost:3000/api/portfolio/projects \
  -H "x-api-key: your_secret_admin_key" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "Test Description",
    "tech": ["React", "Node.js"]
  }'
```

## Next Steps

1. Set up Cloudinary account and get credentials
2. Add credentials to `.env` file
3. Run database migrations
4. Test image upload endpoints
5. Integrate with your admin panel frontend
6. Deploy and test in production
