import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { User } from '../../entities/User';
import bcrypt from 'bcryptjs';
import { MyContext } from '../../types/MyContext';

/**
 *  Login이 성공하면, ctx.req의 session에 userId속성을 추가하여, user.id를 저장시킴.
 */
@Resolver(User)
export class LoginResolver {

  @Query(() => User, { nullable: true })
  async Login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    try {
      const user: User | undefined = await User.findOne({
        email
      });

      if(user) {
        const verified: boolean = bcrypt.compareSync(password, user.password);
        if(verified) {
          ctx.req.session!.userId = user.id
          return user;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch(error) {
      return null;
    }
  }
};