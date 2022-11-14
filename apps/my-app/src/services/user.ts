import { api } from "../api";

import { routes } from "../routes";

export const getUserProfile = async (id: number) =>
  api.get<any>(`${routes.api.users}/${id}`);
