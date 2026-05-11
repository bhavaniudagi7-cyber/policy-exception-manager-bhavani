# SECURITY.md

## Project Name
Policy Exception Manager

## Security Overview
The Policy Exception Manager is designed to manage policy exception requests securely using controlled backend APIs, frontend validation, database migrations, and safe configuration practices.

## Security Measures Implemented

### 1. No Secrets in GitHub
- No real passwords, API keys, or tokens are committed.
- Sensitive values should be stored in `.env`.
- `.env` is excluded using `.gitignore`.

### 2. Backend API Security
- Spring Boot REST APIs are used.
- Input data is validated before processing.
- File upload API validates file type and size.
- Invalid files are rejected.

### 3. Database Security
- Flyway migrations are used for database schema changes.
- No manual database changes are required.
- Indexes are added for better performance.

### 4. Frontend Security
- React login page uses token-based access flow.
- Protected routes prevent unauthorized page access.
- User input fields are handled safely.

### 5. File Upload Security
Allowed file types:
- CSV
- TXT
- PDF

Validation:
- Empty files are rejected.
- Files above allowed size are rejected.
- Unsupported file types are rejected.

### 6. Testing Completed
- Backend Maven tests passed.
- Frontend production build passed.
- Swagger APIs tested.
- CSV export tested.
- File upload tested.
- Responsive UI tested.

## Known Risks
- Demo version uses simplified authentication.
- Production deployment should use stronger JWT secret management.
- Production deployment should disable Swagger if not required.

## Final Security Status
No critical or high-priority security issues are open. The project is ready for Demo Day presentation.

## Team Sign-Off
Java Developer 2: Completed security review and final validation.