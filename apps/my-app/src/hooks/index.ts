import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import * as auth from "../services/auth";
import { routes } from "../routes";
import { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import { LoginInputs } from "../interfaces";
import { UserBuilder } from "../builders";

export const useUser = () => {
  const user = localStorage.getItem("user");

  return [user ? UserBuilder.aUser(JSON.parse(user)).build() : null] as const;
};

const useLogin = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation<
    AxiosResponse<{ token: string }>,
    AxiosError,
    LoginInputs
  >(
    async ({ email, password }) => {
      return auth.login(email, password);
    },
    {
      onSuccess({ data }) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate(routes.app.main);
      },
    }
  );
  const login = useCallback(() => loginMutation, [loginMutation]);
  return [login] as const;
};

const useLogout = () => {
  const removeUser = useCallback(() => {
    localStorage.removeItem("user");
  }, []);
  return [removeUser] as const;
};

export const useSession = () => {
  const [logout] = useLogout();
  const [login] = useLogin();
  const [user] = useUser();

  return {
    user,
    login,
    logout,
  };
};
