import { useCallback, useState } from "react";
import { Button } from "ziegler-ui";
import { UserBuilder } from "../../builders";
import { userService } from "../../services";
import { User } from "../../interfaces";
import { ClientProfile } from "../../components/ClientProfile";

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleOnClick = useCallback(
    (id: number) => async () => {
      const { data } = await userService.getUserProfile(id);
      const userFromJson = UserBuilder.aUser(data).build();

      setUser(userFromJson);
    },
    []
  );

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button label="Fetch Client" onClick={handleOnClick(1)} />
      {user && <ClientProfile user={user} />}
    </div>
  );
};
