import { IsNotEmpty, IsArray, IsString } from 'class-validator';

export class QuestionDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsArray()
  options: string[];

  @IsNotEmpty()
  @IsString()
  answer: string;
}
