import { IsString } from 'class-validator';
export class AnswerQuestionDto {
  @IsString()
  userId: string;

  @IsString()
  questionId: string;

  @IsString()
  answer: string;
}
