import { api } from '../api';

import { apiRoutes } from '../routes';

export const getUserProfile = async (id: number) =>
  api.get<any>(`${apiRoutes.getProfile}/${id}`);
