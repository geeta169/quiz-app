// Create a quiz:

// bash
// Copy code

// Create a quiz:
// POST /quiz/create
// Body:
// {
//   "title": "General Knowledge Quiz"
// }

// Add questions to the quiz:

// bash
// Copy code

// POST /quiz/:quizId/question
// Body:
// {
//   "question": "What is the capital of France?",
//   "options": ["Paris", "Berlin", "Rome", "Madrid"],
//   "answer": "Paris"
// }

// Answer questions:

// bash
// Copy code

// POST /quiz/:quizId/answer
// Body:
// {
//   "userId": "user123",
//   "questionId": ":questionId",
//   "answer": "Paris"
// }

// Calculate score

// GET /quiz/:quizId/score/user123
