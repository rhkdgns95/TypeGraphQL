import { Resolver, Query, Mutation, Arg } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entities/User";
import { RegisterInput } from "./shared/RegisterInput";

@Resolver(User)
class RegisterResolver {
  
  @Query(() => String, { name: "Hello"})
  async hello(): Promise<String> {
    return "Hi";
  }

  // @FieldResolver()
  // async fullName(@Root() parent: User): Promise<string> {
  //   return parent.firstName + parent.lastName;
  // }
  
  // @Mutation(() => User)
  @Mutation(() => User)
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInput
    // @Arg("firstName") firstName: string,
    // @Arg("lastName") lastName: string,
    // @Arg("email") email: string,
    // @Arg("password") password: string
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