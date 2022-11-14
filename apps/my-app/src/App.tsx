import { useCallback, useState } from 'react';
import './App.css';
import { Button } from 'ziegler-ui';
import { userService } from './services';
import { User } from './interfaces';
import { UserBuilder } from './builders';

export function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0);
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleOnClick = useCallback(
    (id:number) => async () => {
      const { data } = await userService.getUserProfile(id);
      const userFromJson = UserBuilder.aUser(data).build();
      setUser(userFromJson);
    },
    [],
  )
  
  return (
    <div className="App">
      <Button label="Fetch User" onClick={handleOnClick(1)} />
      {user && <p>{user.name}</p>}
    </div>
  );
}

export default App;


