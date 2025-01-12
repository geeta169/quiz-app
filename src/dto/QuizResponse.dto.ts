import { IsEnum, IsNotEmpty, IsArray } from 'class-validator';
import { QuizType } from './CreateQuiz.dto';
import { Transform } from 'class-transformer';
import { QuestionResponseDto } from './QuestionResponse.dto';

export class QuizResponse {
  id: string;

  @IsNotEmpty()
  @IsEnum(QuizType)
  title: QuizType;

  @IsArray()
  @Transform(
    ({ value }) =>
      value.map((question) => ({ ...question, answer: undefined })),
    { toClassOnly: true },
  )
  questions: QuestionResponseDto[];
}
