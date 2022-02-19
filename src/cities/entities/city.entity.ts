import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Place } from 'src/places/entities/place.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export class City {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  abstract: string;

  @Field(() => String)
  @Column()
  bannerImage: string;

  @Field(() => String)
  bannerImageUrl: string;

  @OneToMany((type) => Place, (city) => City)
  places: Place[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
