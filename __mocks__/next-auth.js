module.exports = {
  getServerSession: jest.fn(() =>
    Promise.resolve({
      user: {
        name: 'Test User',
        email: 'test@example.com',
      },
    })
  ),
};