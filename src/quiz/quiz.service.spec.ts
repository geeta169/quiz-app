import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';
import { QuizType } from '../../src/dto/CreateQuiz.dto';

describe('QuizService', () => {
  let service: QuizService;
  const createQuizPayload = {
    id: 'quiz-id',
    title: QuizType.GK,
    questions: [],
  };

  const question1Payload = {
    id: 'que-1',
    question: 'What is 2 + 2?',
    options: ['2', '3', '4', '5'],
    answer: '4',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizService],
    }).compile();

    service = module.get<QuizService>(QuizService);
    service.createQuiz(createQuizPayload);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a quiz', async () => {
    const quiz = await service.createQuiz(createQuizPayload);
    expect(quiz).toBeDefined();
    expect(quiz.title).toBe('General Knowledge Quiz');
    expect(quiz.questions).toEqual([]);
  });

  it('should add a question to a quiz', () => {
    const quiz = service.createQuiz(createQuizPayload);
    const question = service.addQuestion(quiz.id, question1Payload);

    expect(question).toBeDefined();
    expect(question.question).toBe('What is 2 + 2?');
    expect(question.answer).toBe('4');
  });
});
