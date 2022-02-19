import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@InputType()
export class CreatePlaceInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  coverImage: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  categoryId: string;

  @Field(() => Boolean)
  @IsBoolean()
  isFeatured: boolean;

  @Field()
  @IsString()
  grade: string;

  @Field()
  @IsString()
  linkExternal: string;
}
