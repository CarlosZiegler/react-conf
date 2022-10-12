import { describe, expect, test, beforeEach } from 'vitest';
import {
  render,
  screen,
  userEvent,
  createMockServer,
  createRestHandler,
  startMockServer,
} from 'shared';
import App from './App';
import { apiRoutes } from './routes';

interface LocalTestContext {
  buttonLabel: string;
}

await new Promise((resolve) => {
  // some promises here
});

describe('App', () => {
  setupTests();
  beforeEach<LocalTestContext>(async (context) => {
    // typeof context is 'TestContext & LocalTestContext'
    context.buttonLabel = 'Fetch User';
  });
  test<LocalTestContext>('Button be defined', async (context) => {
    render(<App />);

    const button = await screen.findByText(context.buttonLabel);
    expect(button).toBeDefined();
  });
  test<LocalTestContext>('Fetch user if clicked on button', async (context) => {
    const wrapper = render(<App />);

    const button = wrapper.getByText(context.buttonLabel);
    userEvent.click(button);
    await wrapper.findByText(/john/i);
  });
});

const setupTests = () => {
  const mockUser = {
    _id: '629753f5f61ffaf75e4cf8c7',
    name: 'John',
    email: 'carlos.z@gmail.com',
    isFirstLogin: false,
    created_at: '2022-06-01T11:56:37.804Z',
    updated_at: '2022-06-11T06:36:04.546Z',
    __v: 0,
  };

  const mockRequestGetUser = createRestHandler(
    'get',
    `${apiRoutes.getProfile}/${1}`,
    200,
    mockUser
  );

  const server = createMockServer(mockRequestGetUser);
  startMockServer(server);
};
