# Email Verification Service

This project implements a simple email verification service using Nest.js framework. It provides endpoints to register users, send verification emails, and verify user emails.

## Project Structure

The project is structured as follows:
- **src**: Contains the source code of the Nest.js application.
  - **modules**: Contains modules for different parts of the application (e.g., UserModule).
  - **controllers**: Contains controllers that handle incoming requests.
  - **services**: Contains services that handle business logic.
  - **tests**: Contains test cases for the application.

## Setup Instructions

To set up the project locally, follow these steps:
1. Clone the repository: `git clone https://github.com/yourusername/email-verification-service.git`
2. Install dependencies: `cd email-verification-service && npm install`
3. Set environment variables (e.g., MongoDB connection string, email SMTP credentials).
4. Start the application: `npm run start`

## Endpoints

### POST /user/register
Registers a new user with the provided username and email. Generates a verification token and sends it to the user's email address.

#### Request Body
```json
{
  "username": "example_user",
  "email": "user@example.com"
}
```

#### Response Body
```json
{
  "username": "example_user",
  "email": "user@example.com",
  "verificationToken": "07d1b0843337599038904b1bc185c3c3",
  "isVerified": false,
  "_id": "667c2b5e5ba33b7d94024ad2",
  "__v": 0
}
```

### GET /user/verify-email/{username}/{verificationToken}
Verifies the user's email address with the provided verification token.

### GET /user/check-verification/{username}
Checks if the user's email address is verified.

## Modules / Controllers / Services

- **UserModule**: Handles user-related operations.
- **UserController**: Defines endpoints for user registration and verification.
- **UserService**: Implements user-related business logic, such as generating tokens and updating user verification status.

## Testing

Tests for this project cover basic functionality of user registration and email verification. To run tests, use:
```bash
npm run test
```

---

Bu README dosyası, projenin genel yapısını, nasıl kurulacağını, sağladığı endpointleri ve kullandığı modüller, kontroller ve servisleri açıklamaktadır. README dosyası, projenin kullanımını ve geliştirilmesini anlamak için başlangıç noktası olarak kullanılabilir.
