
# User Profile Node API - Testing Guide

This guide provides instructions for running unit and end-to-end tests for the User Profile node API.

## Getting Started

To run the tests for the User Profile API, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js and npm
- MySQL database configured and running
- Git

### Instructions

1. **Clone the repository to your local machine:**

   ```bash
   git clone   https://github.com/sindhusid5/nodejs-testing.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd nodejs-testing
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Check for linting errors and fix them (optional but recommended):**

   ```bash
   npm run format    # Format code using Prettier
   npm run lint      # Find linting errors using ESLint
   npm run lint:fix  # Fix linting errors automatically
   ```

5. **Set up the database:**

   - Create a MySQL database.
   - Configure the connection settings in the `.env` file.

6. **Run the tests:**

   ```bash
   npm run test
   ```

   This command executes both unit and end-to-end tests.

### Test Cases

#### Unit Tests

- **Positive Case:** Should be able to retrieve my user entity.
- **Negative Case:** Should not be able to retrieve a different user entity and should return the appropriate error code.
- **Negative Case:** Should not be able to retrieve an entity if not authenticated and should return the appropriate error code.

#### End-to-End Tests
 
- **Positive Case:** Should be able to retrieve my user entity.
- **Negative Case:** Should not be able to retrieve a different user entity and should return the appropriate error code.
- **Negative Case:** Should not be able to retrieve an entity if not authenticated and should return the appropriate error code.
