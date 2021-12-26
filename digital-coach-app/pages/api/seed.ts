// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import AuthService from "@App/lib/auth/AuthService";
import UserBuilder from "@App/lib/user/UserBuilder";
import UserService from "@App/lib/user/UserService";

export default async function seed(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const userCredentials = await Promise.all([
    AuthService.signup("ming@test.com", "password"),
    AuthService.signup("appu@test.com", "password"),
    AuthService.signup("suzy@test.com", "password"),
    AuthService.signup("mike@test.com", "password"),
    AuthService.signup("max@test.com", "password"),
    AuthService.signup("hamzah@test.com", "password"),
  ]);

  await Promise.all(
    userCredentials.map(({ user }, idx) =>
      UserService.add(
        new UserBuilder()
          .withId(user.uid)
          .with({
            email: user.email!,
            name: user.email?.split("@")[0],
          })
          .build()
      )
    )
  );

  res.status(200).json({ message: "Finished seeding users" });
}
