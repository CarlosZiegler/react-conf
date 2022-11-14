
// create a Builder class to create a User

import { User } from "../interfaces"
import { mockUser } from "../__test__/mocks"


  export class UserBuilder {
    private user: User 
    constructor(data:any) {

      if (!data) {
        throw new Error('No data provided or data is empty')
      }
        
      this.user = {
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        website: data.website,

      }
    }

    withId(id: number) {
      this.user.id = id
      return this
    }

    withName(name: string) {
      this.user.name = name
      return this
    }

    withUsername(username: string) {
      this.user.username = username
      return this
    }

    withEmail(email: string) {
      this.user.email = email
      return this
    }
    
    static aUser(data: any) {
      return new UserBuilder(data)
    }
    public build() {
      return this.user  
    }
  }




if (import.meta.vitest) {
  const { expect, test, describe } = import.meta.vitest;

  describe('UserBuilder', () => {
    const user = UserBuilder.aUser(mockUser).build();
    const { company, address, ...userFromJson } = mockUser;

    test('Builder a new user from json object', async () => {
      expect(user).toContain({
        ...userFromJson
      });
    });
    
    test('Builder a new user from json object, and id will be changed if builder changed ID', async () => {
      const userWithNewId = UserBuilder.aUser(mockUser).withId(2).build();
      expect(userWithNewId).toContain({
       ...userFromJson,
       id:2
      });
    });
    
    test("A new user from json object, shouldn't not contains address and company data", async () => {
      expect(user).not.toContain({
        company, address
      });
    });

    test("Builder should be throw if not passed a correct object", async () => {
      expect(() => UserBuilder.aUser(null).build()).toThrowError("No data provided");
    });
  });
}
