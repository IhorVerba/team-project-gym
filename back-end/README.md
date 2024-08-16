## Hard and Smart App - Backend

This file outlines the backend functionalities and setup details for the Hard and Smart training management system.

**Description:**

The backend serves as the data storage and processing engine for the `Hard and Smart` application. It provides APIs for user authentication, managing training data, generating reports, and sending emails.

**Technologies:**

- **Server Framework:** Express.js
- **Database:** MongoDB
- **Database ORM:** Mongoose (for interacting with MongoDB)
- **Programming Language:** TypeScript
- **Authentication:** Simple authentication process with JWT (JsonWebToken) with all security conditions
- **Error Handling:** Sentry

**API Endpoints:**

- **User Management:**
  - Create, read, update, and delete (CRUD) users (trainers and admins)
  - User authentication and authorization
- **Training Management:**
  - CRUD exercises
  - CRUD trainings
  - Assigning training to users
  - Tracking client's progress (user report configuration on the front end)
- **Reporting:**
  - Generate reports on client's progress (specific or general)
- **Email:**
  - Send email notifications (e.g., reports)

**Deployment:**

The backend application can be deployed to various cloud platforms like Heroku, AWS, or Render. This backend is deployed on Render. To form a stable build run `npm run build`.

**Getting Started:**

1. **Prerequisites:**
   - Node.js and npm (or yarn) installed
   - MongoDB instance running
2. **Clone the repository:**
   ```bash
   git clone https://your-git-repository.com/hard-and-smart-backend.git
   ```
3. **Install dependencies:**
   ```bash
   cd hard-and-smart-backend
   npm install (or yarn install)
   ```
4. **Configure environment variables:**
   - Create a `.env` file in the project root directory.
   - Define environment variables for database connection details, authentication secrets, etc. (Refer to example `.env.example` file if provided)
5. **Start the server:**
   ```bash
   npm start (or yarn start)
   ```

**Development Notes:**

- The project utilizes tools like ESLint and Prettier for code quality and unit testing frameworks (e.g., Jest) for testing functionalities.
- Refer to the codebase for detailed API documentation and usage examples.

**Contribution Guidelines:**

(Include details on contributing to the project, if applicable)

**License:**

This project is licensed under the MIT License.

**Team:**

(List team members as in the frontend README)

**For details on the frontend development, please refer to the frontend README.**
