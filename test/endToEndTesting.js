const request = require('supertest')
const app = require('../app')

// Set the port for testing
const PORT = 0 // Use 0 to automatically assign an available port
let server // Declare a variable to hold the server instance

beforeAll((done) => {
  server = app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`)
    done()
  })
})

afterAll((done) => {
  server.close(done) // Close the server after all tests are finished
})

//End to End Testing
describe('End to End Tests for Authenticated Route: GET /users/:id', () => {
  //Test Case 1
  // Positive Case: Should be able to retrieve my user entity
  test('Should be able to retrieve my user entity', async () => {
    // Simulate user login to obtain a token
    const loginResponse = await request(app)
      .post('/users/login')
      .send({ username: 'admin', password: '123456' }) // Replace with actual credentials

    // Extract token from login response
    const token = loginResponse.body.token

    // Send request to GET /users/:id with authenticated user ID
    const response = await request(app)
      .get(`/users/1`)
      .set('Authorization', `Bearer ${token}`)

    // Assert that response contains expected user entity
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id', 1)
  })

  //Test Case 2
  // Negative Case: should not be able to retrieve a different user entity and return appropriate error code
  test('should not be able to retrieve a different user entity and return appropriate error code', async () => {
    // Simulate user login to obtain a token
    const loginResponse = await request(app)
      .post('/users/login')
      .send({ username: 'admin', password: '123456' })

    // Extract token from login response
    const token = loginResponse.body.token

    // Send request to GET /users/:id with a different user's ID
    const response = await request(app)
      .get(`/users/2`)
      .set('Authorization', `Bearer ${token}`)

    // Assert that response returns appropriate error code
    expect(response.status).toBe(403) // Expecting 403 for unauthorized access
  })
})

//Test Case 3
// Negative Case: should not be able to retrieve an entity if not authenticated and return appropriate error code
test('should not be able to retrieve an entity if not authenticated and return appropriate error code', async () => {
  // Send request to GET /users/:id without authentication information
  const response = await request(app).get(`/users/1`)

  // Assert that response returns appropriate error code
  expect(response.status).toBe(401) // Expecting 401 for unauthorized access
})
