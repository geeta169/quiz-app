import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuestionDto } from '../../src/dto/Question.dto';
import { CreateQuizDTO } from '../../src/dto/CreateQuiz.dto';
import { AnswerQuestionDto } from '../../src/dto/AnswerQuestion.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Create a new quiz
  @Post('/create')
  async createQuiz(@Body() createQuizInput: CreateQuizDTO) {
    try {
      return this.quizService.createQuiz(createQuizInput);
    } catch (ex) {
      return ex;
    }
  }

  // Add a question to a quiz
  @Post(':quizId/question')
  addQuestion(@Param('quizId') quizId: string, createQuestion: QuestionDto) {
    return this.quizService.addQuestion(quizId, createQuestion);
  }

  // Get a specific quiz by ID
  @Get(':quizId')
  getQuiz(@Param('quizId') quizId: string) {
    return this.quizService.getQuiz(quizId);
  }

  // Get all quizzes
  @Get()
  getAllQuizzes() {
    return this.quizService.getAllQuizzes();
  }

  //submit the answer
  @Post(':quizId/answer')
  submitAnswer(
    @Param('quizId') quizId: string,
    @Body() answerQuestion: AnswerQuestionDto
  ): boolean {
    return this.quizService.submitAnswer(quizId, answerQuestion);
  }

  @Post(':quizId/score/:userId')
  getUserScore(
    @Param('quizId') quizId: string,
    @Param('userId') userId: string
  ): number {
    const score = this.quizService.calculateScore(userId, quizId);
    const totalQuestions = this.quizService.getTotalQuestions(quizId);
    return (score / totalQuestions) * 100;
  }
}
