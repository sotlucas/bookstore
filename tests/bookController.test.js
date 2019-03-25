const { generateText } = require('../controllers/bookController');

test('should output name and age', () => {
  const text = generateText('Lucas', 80);
  expect(text).toBe('Lucas (80 years old)');
});
