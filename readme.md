

This guide provides instructions for running unit and end-to-end tests for the User Profile API.

## Getting Started

To run the tests for the User Profile API, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine
- MySQL database configured and running
- Git installed on your machine

### Instructions

1. Require MySQL, Node

2. Clone the repository to your local machine:

3.Navigate to the project directory:

`cd testing`

4. Install dependencies

`npm install` or
`npm i`

5. To check linting errors and fix them, use the following commands:
   `npm run format` # Format code using Prettier
   `npm run lint` # Find linting errors using ESLint
   `npm run lint:fix` # Fix linting errors automatically

6. Set up the database:
   Create a MySQL database and configure the connection settings in the .env file.

7. Running Test:
   `npm run test`
   This command executes both unit testing and end to end testing.

Test Cases
Unit Tests
Positive Case: should be able to retrieve my user entity
Negative Case: should not be able to retrieve a different user entity and return appropriate error code
Negative Case: should not be able to retrieve an entity if not authenticated and return appropriate error code

End-to-End Tests
Positive Case: Should be able to retrieve my user entity
Negative Case: should not be able to retrieve a different user entity and return appropriate error code
Negative Case: should not be able to retrieve an entity if not authenticated and return appropriate error code
