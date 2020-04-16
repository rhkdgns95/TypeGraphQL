import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entities/User";

@Resolver(User)
class RegisterResolver {
  
  @Query(() => String, { name: "Hello"})
  async hello(): Promise<String> {
    return "Hi";
  }

  @FieldResolver()
  async fullName(@Root() parent: User): Promise<string> {
    return parent.firstName + parent.lastName;
  }
  
  // @Mutation(() => User)
  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    try {
      const hashedPassword: string = bcrypt.hashSync(password, 12);
      const user: User = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      }).save();

      return user;
    } catch(error) {
      console.log("Error: ", error.message);
      return null;
    }
  }
};

export default RegisterResolver;