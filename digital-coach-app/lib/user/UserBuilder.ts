import { Timestamp } from "firebase/firestore";
import getRandomInt from "@App/util/getRandomInt";
import BaseBuilder from "@App/lib/builder/BaseBuilder";
import {
  IUser,
  EUserConcentrations,
  EUserProficiencies,
} from "@App/lib/user/models";

export default class UserBuilder extends BaseBuilder<IUser> {
  private id = "420";
  private name = "Jon Bellion";
  private email = "jonny@test.com";
  private avatarUrl = "";
  private concentration =
    Object.values(EUserConcentrations)[
      getRandomInt(Object.values(EUserConcentrations).length - 1)
    ];
  private proficiency =
    Object.values(EUserProficiencies)[
      getRandomInt(Object.values(EUserProficiencies).length - 1)
    ];
  private createdAt = Timestamp.now();
  private registrationCompletedAt = Timestamp.now();

  build() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatarUrl: this.avatarUrl,
      concentration: this.concentration,
      proficiency: this.proficiency,
      createdAt: this.createdAt,
      registrationCompletedAt: this.registrationCompletedAt,
    };
  }

  withId(id: string) {
    this.id = id;
    return this;
  }
}
