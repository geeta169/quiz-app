import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AnswerQuestionDto } from '../../src/dto/AnswerQuestion.dto';
import { CreateQuizDTO } from '../../src/dto/CreateQuiz.dto';
import { QuestionDto } from '../../src/dto/Question.dto';
import { QuizResponse } from '../../src/dto/QuizResponse.dto';

import { v4 as uuidv4 } from 'uuid';

interface UserAnswer {
  questionId: string;
  answer: string;
}

@Injectable()
export class QuizService {
  private quizzes = [];

  private userAnswers: { [userId: string]: UserAnswer[] } = {}; // Store user answers by userId

  // Create a new quiz
  createQuiz(createQuiz: CreateQuizDTO) {
    const { title, questions } = createQuiz;
    const updatedQuestions = questions.length
      ? questions.map((question) => {
          return {
            id: uuidv4(),
            ...question,
          };
        })
      : [];

    const newQuiz = {
      id: uuidv4(),
      title,
      questions: updatedQuestions,
    };
    this.quizzes.push(newQuiz);
    return newQuiz;
  }

  // Add a question to a quiz
  addQuestion(quizId: string, question: QuestionDto) {
    const quiz = this.getQuiz(quizId);
    const newQuestion = {
      id: uuidv4(),
      ...question,
    };

    quiz?.questions.push(newQuestion);
    return newQuestion;
  }

  // Get a quiz by ID
  getQuiz(quizId: string) {
    const quiz = this.quizzes.find((q) => q.id === quizId);
    if (!quiz) throw new NotFoundException('Quiz not found');
    return plainToClass(QuizResponse, quiz);
  }

  // Get all quizzes
  getAllQuizzes(): QuizResponse[] {
    return plainToClass(QuizResponse, this.quizzes);
  }

  // Answer a question in the quiz
  submitAnswer(
    quizId: string,
    { userId, questionId, answer }: AnswerQuestionDto
  ): boolean {
    const quiz = this.quizzes.find((q) => q.id === quizId);
    const question = quiz.questions.find((q) => q.id === questionId);
    if (!question) throw new NotFoundException('Question not found');

    // Save user answer
    if (!this.userAnswers[userId]) {
      this.userAnswers[userId] = [];
    }

    this.userAnswers[userId].push({ questionId, answer });

    return question.answer === answer;
  }

  calculateScore(userId: string, quizId: string): number {
    const quiz = this.quizzes.find((q) => q.id === quizId);

    const userAnswerData = this.userAnswers[userId];
    if (!userAnswerData)
      throw new NotFoundException('No answers found for user');

    let correctAnswers = 0;

    // Compare the answers
    userAnswerData.forEach((userAnswer) => {
      const question = quiz.questions.find(
        (q) => q.id === userAnswer.questionId
      );
      if (question?.answer === userAnswer?.answer) {
        correctAnswers++;
      }
    });

    return correctAnswers;
  }

  // Get total number of questions in a quiz
  getTotalQuestions(quizId: string): number {
    const quiz = this.getQuiz(quizId);
    return quiz.questions.length;
  }
}
