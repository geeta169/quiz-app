import { QuestionDto } from './Question.dto';
import { IsNotEmpty, IsArray, IsEnum } from 'class-validator';

export enum QuizType {
  Math = 'Maths Quiz',
  GK = 'General Knowledge Quiz',
  Reasoning = 'Logical Reasoning Quiz',
}
export class CreateQuizDTO {
  id: string;

  @IsNotEmpty()
  @IsEnum(QuizType)
  title: QuizType;

  @IsArray()
  questions: QuestionDto[];
}
