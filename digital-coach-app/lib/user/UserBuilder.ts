import { Timestamp } from "firebase/firestore";
import getRandomInt from "../../util/getRandomInt";
import BaseBuilder from "../builder/BaseBuilder";
import { User, UserConcentrations, UserProficiencies } from "./models";

export default class UserBuilder extends BaseBuilder<User> {
  private id = "420";
  private name = "Jon Bellion";
  private email = "jonny@test.com";
  private avatarUrl = "";
  private concentration =
    Object.values(UserConcentrations)[
      getRandomInt(Object.values(UserConcentrations).length - 1)
    ];
  private proficiency =
    Object.values(UserProficiencies)[
      getRandomInt(Object.values(UserProficiencies).length - 1)
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
