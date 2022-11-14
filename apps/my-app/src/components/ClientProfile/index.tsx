import {
  createStyles,
  Card as CardMantine,
  Text,
  Group,
  Paper,
  Title,
  Container,
  TextInput,
  Button,
  Avatar,
} from "@mantine/core";
import { User } from "../../interfaces";

export const ClientProfile = ({ user }: { user: User }) => {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
      mt={50}
    >
      <Avatar
        src={
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
        }
        size={120}
        radius={120}
        mx="auto"
      />
      <Text align="center" size="lg" weight={500} mt="md">
        {user.name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {user.email} • {user.website}
      </Text>

      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  );
};
