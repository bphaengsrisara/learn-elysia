# Elysia RESTful API Example

A RESTful API built with Elysia.js, Prisma, and PostgreSQL demonstrating CRUD operations with related models.

## Models

The API includes the following models with relationships:

- **User**: Has many Posts and Comments
- **Post**: Belongs to a User and has many Comments
- **Comment**: Belongs to a User and a Post

## API Endpoints

The API provides the following endpoints:

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `PATCH /api/users/:id` - Partially update a user
- `DELETE /api/users/:id` - Delete a user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `PATCH /api/posts/:id` - Partially update a post
- `DELETE /api/posts/:id` - Delete a post

### Comments
- `GET /api/comments` - Get all comments
- `GET /api/comments/:id` - Get comment by ID
- `POST /api/comments` - Create a new comment
- `PUT /api/comments/:id` - Update a comment
- `PATCH /api/comments/:id` - Partially update a comment
- `DELETE /api/comments/:id` - Delete a comment

## Getting Started

### Prerequisites
- Bun installed
- Docker and Docker Compose (for PostgreSQL)

### Setup

1. Clone the repository
2. Install dependencies:
```bash
bun install
```

3. Start the PostgreSQL database:
```bash
docker-compose up -d
```

4. Create a `.env` file with the following content:
```
# Example .env file - replace with your actual values
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
PORT=3000
DB_USER=username
DB_PASSWORD=password
DB_NAME=your_database
DB_PORT=5432
DB_HOST=localhost
```

5. Run database migrations:
```bash
bun run migrate
```

6. Seed the database:
```bash
bun run db:seed
```

7. Start the development server:
```bash
bun run dev
```

## API Documentation

API documentation is available at `/swagger` when the server is running.

## Development

To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the welcome page.
Visit http://localhost:3000/swagger to see the API documentation.