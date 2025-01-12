import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsArray, IsString } from 'class-validator';

export class QuestionResponseDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsArray()
  options: string[];

  @Exclude()
  answer: string;
}
