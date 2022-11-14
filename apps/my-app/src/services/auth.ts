import { api } from "../api";

import { routes } from "../routes";

export const login = (email: string, password: string) => {
  return api.get<{ token: string }>(routes.api.login, {
    email,
    password,
  });
};
