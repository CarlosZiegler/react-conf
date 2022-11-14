import React from 'react';
import { describe, expect, test, beforeEach,  } from 'vitest';
import {
  render,
  screen,
  userEvent,
  createMockServer,
  createRestHandler,
  startMockServer,
  act,

} from 'shared';
import App from './App';
import { apiRoutes } from './routes';
import { userService } from './services';
import { mockUser } from './__test__/mocks';
import { LocalTestContext } from './interfaces';



describe('App', () => {
  beforeEach<LocalTestContext>(async (context) => {
    setupTests();
    // typeof context is 'TestContext & LocalTestContext'
    context.buttonLabel = 'Fetch User';
    context.mockUser = mockUser 
  });

  test<LocalTestContext>('Button be defined', async (context) => {
    render(<App />);

    const button = await screen.findByText(context.buttonLabel);
    expect(button).toBeDefined();
  });

  test<LocalTestContext>('Fetch user if clicked on button', async (context) => {
    const wrapper = render(<App />);
    const button = wrapper.getByText(context.buttonLabel);
    await userEvent.click(button);

    const name = await wrapper.findByText(context.mockUser.name);
    expect(name).toBeDefined(); 
  });
  
});


const setupTests = () => {
  const mockRequestGetUser = createRestHandler(
    'get',
    `${apiRoutes.users}/${1}`,
    200,
    mockUser
  );

  const server = createMockServer(mockRequestGetUser);
  startMockServer(server);
};
