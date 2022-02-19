import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Place {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  coverImage: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Category)
  @ManyToOne((type) => Category, (category) => category.places, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Field()
  @Column()
  categoryId: string;

  @Field()
  @Column()
  cityId: string;

  @Field(() => Boolean)
  @Column()
  isFeatured: boolean;

  @Field()
  @Column()
  grade: string;

  @Field()
  @Column()
  linkExternal: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
