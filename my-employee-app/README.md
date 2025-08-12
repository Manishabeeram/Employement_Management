# Employment Management System

## Setup Instructions

### Backend (Spring Boot)
1. Install Java 17+ and Maven.
2. In the project root, run:
   ```
   mvn spring-boot:run
   ```
3. The backend will start on port 8080 (default).

### Frontend (React)
1. Install Node.js and npm.
2. Navigate to `my-employee-app` folder:
   ```
   cd my-employee-app
   npm install
   npm run dev
   ```
3. The frontend will start on port 5173 (default).

## Running Tests

### Backend (JUnit)
- In the project root, run:
  ```
  mvn test
  ```
- Test results are in `target/surefire-reports`.

### Frontend (Jest)
- In `my-employee-app`, run:
  ```
  npm test
  ```
- This will run all Jest tests (e.g., `EmployeeList.test.jsx`).

## Features
- Add employee
- Filter employees by location
- Delete employee
- Fully tested backend and frontend

## API Endpoints
- `GET /api/employees` - List all employees
- `POST /api/employees` - Add employee
- `DELETE /api/employees/{id}` - Delete employee
- `GET /api/employees?location=XYZ` - Filter by location

## Contact
For questions, contact the project owner.
