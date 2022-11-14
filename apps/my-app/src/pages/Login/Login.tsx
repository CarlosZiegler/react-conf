import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Center,
} from "@mantine/core";
import { useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useSession } from "../../hooks";
import { loginSchema } from "../../schemas";
import ErrorMessage from "../../components/ErrorMessage";
import { LoginInputs } from "../../interfaces";
import { routes } from "../../routes";

export const LoginPage = () => {
  const { user } = useSession();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const { login } = useSession();
  const { mutate: handleLogin, isLoading, isError, error, data } = login();

  useEffect(() => {
    if (isError) {
      showNotification({
        autoClose: 5000,
        title: "Invalid details",
        message: error?.message,
        color: "red",
        loading: false,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (user) {
      navigate(routes.app.main);
    }
  }, [user]);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const { email, password } = data;
    handleLogin({ email, password });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper p={30} mt={30} radius="md" style={{ width: "500px" }}>
        <Title align="center">
          <Center>
            <Group>Login</Group>
          </Center>
        </Title>
        <Title order={3} align="center">
          <Center>Welcome back!</Center>
        </Title>

        <Group style={{ width: "100%" }} mt={50}>
          <TextInput
            style={{ width: "100%" }}
            label={
              <Text
                align="left"
                style={{ width: "500px", alignSelf: "flex-start" }}
              >
                Email
              </Text>
            }
            placeholder="you@example.com"
            {...register("email")}
          />

          <ErrorMessage inputName={"email"} errors={errors} />
        </Group>
        <Group style={{ width: "100%" }}>
          <PasswordInput
            style={{ width: "100%" }}
            label={
              <Text
                align="left"
                style={{ width: "500px", alignSelf: "flex-start" }}
              >
                Password
              </Text>
            }
            placeholder="Your password"
            mt="md"
            {...register("password")}
          />

          <ErrorMessage inputName={"password"} errors={errors} />
        </Group>

        <Group position="center" mt="md">
          <Button mt="md" type="submit" loading={isLoading} disabled={!isValid}>
            Sign in
          </Button>
        </Group>
      </Paper>
    </form>
  );
};
