import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlaceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
