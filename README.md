# 📚 Book Review API

A RESTful API for managing books and user reviews, built with **Node.js**, **Express**, **MongoDB**, and **JWT** authentication.

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/mehulparihar/Book-Review-API.git
cd book-review-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookreviews
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### 4. Start the Server
```bash
npm run dev
```

---

## 🧪 API Endpoints

### 🔐 Auth Routes
- `POST /api/auth/signup` – Register new user  
- `POST /api/auth/login` – Login and get access_token & referesh_token  

### 📘 Book Routes
- `POST /api/books` – Add a new book (requires auth)  
- `GET /api/books` – Get all books with optional filters (`author`, `genre`, `page`, `limit`)  
- `GET /api/books/:id` – Get book details + average rating + paginated reviews  

### ✍️ Review Routes
- `POST /api/books/:id/reviews` – Add or update a review (requires auth)  
- `PUT /api/reviews/:id` – Update your review  
- `DELETE /api/reviews/:id` – Delete your review  

### ✍️ Search Routes
- `GET /api/search?q=` – Search books by title or author  

---

## 💡 Example API Requests

### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@gmail.com",
  "password": "12345678"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@gmail.com",
  "password": "12345678"
}
```

### Add Book (Authenticated)
```http
POST /api/books
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json

{
  "title": "LLM from Scratch",
  "author": "Sebastian Raschka",
  "genre": "Research-Reports"
}
```

### Get All Books
```http
GET /api/books
```

### Get Book Details
```http
GET /api/books/<bookId>?page=1&limit=5
```

### Search Books
```http
GET /api/books/search?q=LLM
```

### Add Review
```http
POST /api/books/<bookId>/reviews
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Amazing Book!"
}
```

### Update Review
```http
PUT /api/reviews/<reviewId>
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json

{
  "rating": 4,
  "comment": "Updated review"
}
```

### Delete Review
```http
DELETE /api/reviews/<reviewId>
Authorization: Bearer <ACCESS_TOKEN>
```

---

## 🧠 Design Decisions

- **JWT** for stateless auth and simplicity in scaling.
- One review per user per book (upsert behavior).
- Book ratings are not embedded but calculated dynamically from `Review` collection.
- Pagination and filtering for performance and usability.
- MongoDB chosen for flexible document schema; Mongoose for modeling.

---

## 🗂️ Database Schema

### 🧑 User
```js
{
  _id: ObjectId,
  username: String,  // unique
  email: String,     // unique
  password: String   // hashed
}
```

### 📖 Book
```js
{
  _id: ObjectId,
  title: String,
  author: String,
  genre: String,
  createdBy: ObjectId, // ref: User
  ratings: [Number],
  createdAt: Date,
  updatedAt: Date
}
```

### 📝 Review
```js
{
  _id: ObjectId,
  book: ObjectId,   // ref: Book
  user: ObjectId,   // ref: User
  rating: Number,   // 1-5
  comment: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT & jsonwebtoken
- bcrypt.js
- dotenv
- Postman for testing

---

## 👨‍💻 Author

Made with ❤️ by Mehul Parihar
