# TypeGraphQL
- TypeGraphQL Tutorials

## Install
- yarn add apollo-server-express express graphql reflect-metadata type-graphql
- yarn add -D @types/express @types/graphql @types/node nodemon ts-node typescript
- yarn add graphql@14.1.1
- yarn add pg typeorm bcryptjs
- yarn add -D @types/bcryptjs

## Todo
- [x] Create TypeGraphQL - (Playground, Resolver).
- [x] Register Resolver + FieldResolver. 

## Study
0. graphql을 15.0.0버전 => 14.1.1로 낮추어서 사용.
1. @Resolver()
- Decorator인 @Resolver는 graphql의 resolver들을 담당하는 클래스를 의미.
- 해당 클래스 안에서 다양한 메소드들은 @Query와 @Mutation등 @(데코레이터)로 표현.
- 다음과 같이 표현함.
```
// @Query의 첫번째인자: 인자와 리턴 타입을 명시
// @Query의 두번째인자: name으로 playground에서 실행하는 resolver의 이름을 바꿈(비어잇으면 함수명 기본 명칭인 myFunction으로 됨)
@Query(() => String, { name: "MyFunction", nullable: true })
async myFunction(): Promise<string> {
  return "Hello";
}
```
2. Typeorm 설정
- ormconfig.json을 [문서](https://typeorm.io/#/)참고하여 작성.
- ormConfig.ts로 변경 후, DB Connection이 정상적으로 연결되면 server를 실행시키도록 변경함.
3. User.ts
- TypeOrm의 Entity를 생성.
- @Entity()위에 TypeGraphQL을 사용하도록 @ObjectType()을 추가
- @Field()를 모든 필드값에 설정.
[/entities/User.ts]
```
@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  
  @Field(() => ID)  // TypeGraphQL을 위한 ID값 설정.
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @Column("test", { unique: true })
  email: string;

  @Field() // @FiledResolver()로 호출될 내용
  fullName: string;

  ...
}
```
4. Resolver 작성
- GraphQL의 Resolver를 담당함.
- Resolver를 의미하는 데코레이터 @Resolver(모델명) 작성.
- TypeGraphQL에서 사용할 수 있는 @FieldResolver 함수생성(fullName) - 실제 DB의 필드로 들어갈 값이 아니라 Resolver에서 호출될 임의의 함수.
[api/Register.ts]
```
@Resolver(User)
class RegisterResolver {

  @Query(() => String, { name: "Hello" })
  async hello(): Promise<string> {
    return "HI"
  };

  @FieldResolver()  // 참조하는 User 모델에 필드값에 접근하여, 원하는 형식으로 호출하도록 함.
  async fullName(@Root() parent: User) {
    const { firstName, lastName } = parent;
    return firstName + lastName;
  };
  
}
```


## Issue
- [ ] Resolver Function Mutation and Query how to set response type.