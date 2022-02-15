import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}
