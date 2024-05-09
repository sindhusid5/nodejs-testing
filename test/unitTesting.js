const { User } = require('../model/user')
const request = require('supertest')
const app = require('../app')

//Unit Testing

describe('Unit Tests for Authenticated Route: GET /users/:id', () => {
  ////Test Case 1
  // Positive Case: should be able to retrieve my user entity
  test('should be able to retrieve my user entity', async () => {
    // Mock authenticated user ID
    const userId = 1
    const authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEzODQ0MjgyLCJleHAiOjE3MTM4NzY2ODJ9.nR0UVClxlZce51Fuh0MRx-VyB0IaTQ_zyC8z-HlOAH0' // Replace with an actual token

    // Mock the User.findByPk method to return a user entity
    User.findByPk = jest.fn().mockResolvedValue({
      id: userId,
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com'
    })

    // Send request to GET /users/:id with authenticated user ID
    const response = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)

    // Assert that response contains expected user entity
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: userId,
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com'
    })
  })

  //Test Case 2
  // Negative Case: should not be able to retrieve a different user entity and return appropriate error code
  test('should not be able to retrieve a different user entity and return appropriate error code', async () => {
    // Mock authenticated user ID
    const userId = 1
    const authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEzODQ0MjgyLCJleHAiOjE3MTM4NzY2ODJ9.nR0UVClxlZce51Fuh0MRx-VyB0IaTQ_zyC8z-HlOAH0' // Replace with an actual token

    // Mock the User.findByPk method to return a different user entity
    User.findByPk = jest.fn().mockResolvedValue({
      id: 2,
      name: 'Another User',
      username: 'anotheruser',
      email: 'another@example.com'
    })

    // Send request to GET /users/:id with a different user's ID
    const response = await request(app)
      .get(`/users/2`)
      .set('Authorization', `Bearer ${authToken}`)

    // Assert that response returns appropriate error code
    expect(response.status).toBe(403) // or 404 depending on your authorization logic
  })

  //Test Case 3
  // Negative Case: should not be able to retrieve an entity if not authenticated and return appropriate error code
  test('should not be able to retrieve an entity if not authenticated and return appropriate error code', async () => {
    // Send request to GET /users/:id without authentication information
    const response = await request(app).get(`/users/1`)

    // Assert that response returns appropriate error code
    expect(response.status).toBe(401)
  })
})
