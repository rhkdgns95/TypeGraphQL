# TypeGraphQL
- TypeGraphQL Tutorials

## Install
- yarn add apollo-server-express express graphql reflect-metadata type-graphql
- yarn add -D @types/express @types/graphql @types/node nodemon ts-node typescript
- yarn add graphql@14.1.1


## Todo
- [ ] Create TypeGraphQL - (Playground, Resolver).

## Study
0. graphql을 15.0.0버전 => 14.1.1로 낮추어서 사용
1. @Resolver()
- Decorator인 @Resolver는 graphql의 resolver들을 담당하는 클래스를 의미함.
- 해당 클래스 안에서 다양한 메소드들은 @Query와 @Mutation등 @(데코레이터)로 표현.
- 다음과 같이 표현을함.
```
// @Query의 첫번째인자: 인자와 리턴 타입을 명시
// @Query의 두번째인자: name으로 playground에서 실행하는 resolver의 이름을 바꿈(비어잇으면 함수명 기본 명칭인 myFunction으로 됨)
@Query(() => String, { name: "MyFunction", nullable: true })
async myFunction(): Promise<string> {
  return "Hello";
}
```