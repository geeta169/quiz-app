import { Test, TestingModule } from '@nestjs/testing';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { NotFoundException } from '@nestjs/common';
import { QuizType } from '../../src/dto/CreateQuiz.dto';

describe('QuizController', () => {
  let controller: QuizController;
  let service: QuizService;
  const quizId = 'quiz-123';
  const userId = 'user123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [
        {
          provide: QuizService,
          useValue: {
            createQuiz: jest.fn(),
            addQuestion: jest.fn(),
            answerQuestion: jest.fn(),
            calculateScore: jest.fn(),
            getQuiz: jest.fn(),
            getAllQuizzes: jest.fn(),
            getTotalQuestions: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<QuizController>(QuizController);
    service = module.get<QuizService>(QuizService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a quiz', async () => {
    const createQuizPayload = {
      id: '124',
      title: QuizType.GK,
      questions: [],
    };

    jest.spyOn(service, 'createQuiz').mockReturnValue(createQuizPayload);

    const result = controller.createQuiz(createQuizPayload);
    expect(result).toBe(result);
  });

  it('should add a question to a quiz', async () => {
    const quizId = 'some-id';
    const questionInput = {
      id: '1234',
      question: 'What is 2 + 2?',
      options: ['2', '3', '4', '5'],
      answer: '4',
    };
    const result = { id: 'question-id', ...questionInput };
    jest.spyOn(service, 'addQuestion').mockReturnValue(result);

    expect(await controller.addQuestion(quizId, questionInput)).toEqual(result);
  });

  it('should calculate score for a user', () => {
    const scoreAndQuestion = 2;
    jest.spyOn(service, 'calculateScore').mockReturnValue(scoreAndQuestion);
    jest.spyOn(service, 'getTotalQuestions').mockReturnValue(scoreAndQuestion);
    expect(controller.getUserScore(quizId, userId)).toEqual(
      (scoreAndQuestion / scoreAndQuestion) * 100,
    );
  });

  it('should throw error if quiz not found', async () => {
    jest.spyOn(service, 'getQuiz').mockImplementation(() => {
      throw new NotFoundException('Quiz not found');
    });

    try {
      await controller.getQuiz(quizId);
    } catch (ex) {
      expect(ex.response.message).toBe('Quiz not found');
    }
  });
});
