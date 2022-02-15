import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  @IsOptional()
  description?: string;
}
