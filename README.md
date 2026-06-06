# Kanban Board Backend

A RESTful API backend for a Kanban Board application built with **Node.js**, **Express**, and **MongoDB**.

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Organize tasks by status (To Do, In Progress, Done)
- ✅ Drag-and-drop reordering support
- ✅ MongoDB integration for data persistence
- ✅ CORS enabled for frontend integration
- ✅ Error handling and validation

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Nodemon** - Development server with auto-reload

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote URI)

### Setup

1. **Clone or navigate to the project directory:**

```bash
cd kanban-backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kanban
NODE_ENV=development
```

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Get All Tasks

```http
GET /api/tasks
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Design UI",
    "description": "Create mockups for the dashboard",
    "status": "in-progress",
    "order": 0,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

### Create a Task

```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Design UI",
  "description": "Create mockups for the dashboard",
  "status": "todo",
  "order": 0
}
```

**Response:** `201 Created`

### Update a Task

```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "status": "in-progress",
  "order": 1
}
```

**Response:** `200 OK`

### Delete a Task

```http
DELETE /api/tasks/:id
```

**Response:** `200 OK`

### Reorder Tasks (Bulk Update)

```http
PUT /api/tasks/reorder
Content-Type: application/json

{
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "status": "in-progress",
      "order": 0
    }
  ]
}
```

**Response:** `200 OK`

## Database Schema

### Task Model

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Unique identifier |
| `title` | String | Task title (required) |
| `description` | String | Task description (optional) |
| `status` | Enum | Task status: `todo`, `in-progress`, `done` |
| `order` | Number | Display order within status column |
| `createdAt` | Date | Creation timestamp |
| `updatedAt` | Date | Last update timestamp |

## Project Structure

```
kanban-backend/
├── index.js              # Main server file
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
└── README.md             # This file
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `500 Internal Server Error` - Server error

## CORS Configuration

CORS is enabled for all origins. To restrict in production, modify the CORS configuration in `index.js`:

```javascript
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

## Next Steps

1. Set up MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in `.env` if using a remote database
3. Run the development server: `npm run dev`
4. Test endpoints using Postman or similar tools
5. Connect with the frontend application

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`

**Port Already in Use:**
- Change `PORT` in `.env` to an available port

**CORS Errors:**
- Verify frontend is running on the correct port
- Check CORS configuration in `index.js`

## License

ISC
