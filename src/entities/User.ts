import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false })
  firstName: string;

  @Field()
  @Column("text")
  lastName: string;
  
  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  @Column("text")
  password: string;

  @Field()
  fullName: string;

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: string;
};