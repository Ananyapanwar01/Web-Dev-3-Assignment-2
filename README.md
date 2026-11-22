# Student Management REST API

**Web Dev III (Node.js & Express Backend) — Unit-2 | Lab Assignment 2**

A RESTful backend API built with **Node.js** and **Express.js** to perform CRUD operations on in-memory student records without a database.

---

## Project Structure

```text
student-management-rest-api/
├── data/
│   └── students.js                                   # In-memory JSON array of student records
├── middleware/
│   └── logger.js                                     # Custom request logger middleware (Method, URL, Time)
├── routes/
│   └── studentRoutes.js                              # Express Router for /students CRUD endpoints
├── app.js                                            # Main Express server entry point & error handling
├── package.json                                      # Project metadata & dependencies
├── .gitignore                                        # Git ignore rules
├── Student_Management_API.postman_collection.json    # Importable Postman collection for API testing
└── README.md                                         # Setup & API documentation
```

---

## Setup & Installation

1. **Extract the ZIP file** and navigate into the project folder:
   ```bash
   cd student-management-rest-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   The server runs at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint | Description | Success Status | Error Statuses |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/students` | Retrieve all student records | `200 OK` | — |
| `GET` | `/students/:id` | Retrieve a single student by ID | `200 OK` | `400`, `404` |
| `POST` | `/students` | Add a new student (`name`, `course`) | `201 Created` | `400` |
| `PUT` | `/students/:id` | Update an existing student (`name`, `course`) | `200 OK` | `400`, `404` |
| `DELETE` | `/students/:id` | Delete a student by ID | `200 OK` | `400`, `404` |

---

## Testing with Postman

1. Open **Postman** and click **Import**.
2. Select `Student_Management_API.postman_collection.json` from the project root.
3. Run each request (`GET`, `POST`, `PUT`, `DELETE`) against `http://localhost:3000` and verify the JSON responses and HTTP status codes (`200`, `201`, `400`, `404`).
