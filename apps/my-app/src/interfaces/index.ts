export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export type LocalTestContext = {
  buttonLabel: string;
  mockUser: any;
};

export type LoginInputs = {
  email: string;
  password: string;
};
