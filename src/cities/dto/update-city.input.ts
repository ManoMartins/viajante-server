import { CreateCityInput } from './create-city.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class UpdateCityInput extends PartialType(CreateCityInput) {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @IsOptional()
  name?: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  @IsOptional()
  description?: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Abstract is required' })
  @IsOptional()
  abstract?: string;

  @Field(() => GraphQLUpload)
  @IsNotEmpty({ message: 'Banner image is required' })
  @IsOptional()
  bannerImage?: Promise<FileUpload>;
}
