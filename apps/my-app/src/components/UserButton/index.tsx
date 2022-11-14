import React from "react";
import { UnstyledButtonProps, Group, Avatar, Text } from "@mantine/core";

type UserButtonProps = UnstyledButtonProps & {
  image?: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
};

export function UserButton({ image, name, email, icon }: UserButtonProps) {
  return (
    <Group>
      <Avatar
        src={"https://avatars.githubusercontent.com/u/38855507?v=4"}
        radius="xl"
      />

      <div style={{ flex: 1 }}>
        <Text size="sm" weight={500}>
          {name}
        </Text>

        <Text color="dimmed" size="xs">
          {email}
        </Text>
      </div>
    </Group>
  );
}
