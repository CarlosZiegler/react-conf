import { useState } from 'react';
import './App.css';
import { Button } from 'ziegler-ui';
import { userService } from './services';

export function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0);
}

function App() {
  const [user, setUser] = useState<any>(null);

  const handleOnClick = async () => {
    const { data } = await userService.getUserProfile(1);

    setUser(data);
  };

  return (
    <div className="App">
      <Button label="Fetch User" onClick={handleOnClick} />
      {user && <p>{user.name}</p>}
    </div>
  );
}

export default App;

if (import.meta.vitest) {
  const { it, expect, test, describe } = import.meta.vitest;
  describe('App', () => {
    test('Button be defined', async () => {
      it('add', () => {
        expect(add()).toBe(0);
        expect(add(1)).toBe(1);
        expect(add(1, 2, 3)).toBe(6);
      });
    });
  });
}
