# API Documentation for NodeBB Intern Task
Base URL: http://localhost:5000/api
## Authentication
POST /api/auth/register
Request JSON
{
  "name":"Full Name",
  "email":"user@example.com",
  "password":"password123"
}
Response
{
  "token":"JWT token"
}
POST /api/auth/login
Request JSON
{
  "email":"user@example.com",
  "password":"password123"
}
Response
{
  "token":"JWT token"
}
GET /api/auth/me
Headers
Authorization: Bearer <token>
Response
{
  "_id":"user id",
  "name":"Full Name",
  "email":"user@example.com",
  "role":"user",
  "createdAt":"2025-01-01T00:00:00.000Z"
}
## Topics
POST /api/topics
Headers
Authorization: Bearer <token>
Request JSON
{
  "title":"Topic title"
}
Response Topic object
GET /api/topics
Response Array of topics
GET /api/topics/:slug
Response
{
  "topic":{...},
  "posts":[...]
}
## Posts
POST /api/posts/:topicId
Headers
Authorization: Bearer <token>
Request JSON
{
  "content":"Post body"
}
Response Post object
GET /api/posts/by/:userId
Response Array of posts
## Notes
Use the JWT token returned at login/register in the Authorization header as: Bearer <token>
Set environment variable MONGO_URI and JWT_SECRET for production
