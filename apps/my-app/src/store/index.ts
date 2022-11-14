// create a class to manipulate user on local storage

import { UserBuilder } from "../builders";

export class UserStore {
  static getUser() {
    const data = localStorage.getItem("user");
    const user = !!data ? UserBuilder.aUser(JSON.parse(data)).build() : null;
    return user;
  }

  static setUser(data: any) {
    if (data) {
      const user = UserBuilder.aUser(data).build();
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  static clearUser() {
    localStorage.removeItem("user");
  }
}
