import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateCityInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Abstract is required' })
  abstract: string;

  @Field(() => GraphQLUpload)
  @IsNotEmpty({ message: 'Banner image is required' })
  bannerImage: Promise<FileUpload>;
}
