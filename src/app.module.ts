import { Module } from '@nestjs/common';
import { QuizService } from './quiz/quiz.service';
import { QuizController } from './quiz/quiz.controller';

@Module({
  imports: [],
  controllers: [QuizController],
  providers: [QuizService],
})
export class AppModule {}
