import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Student } from './student';

@ObjectType()
export class Course {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;
}
