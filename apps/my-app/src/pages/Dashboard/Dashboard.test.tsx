import React from "react";
import { describe, expect, test, beforeEach, beforeAll } from "vitest";
import {
  render,
  screen,
  userEvent,
  createMockServer,
  createRestHandler,
  startMockServer,
} from "shared";
import { Dashboard } from "./";
import { routes } from "../../routes";
import { mockUser } from "../../__test__/mocks";
import { LocalTestContext } from "../../interfaces";

describe("Dashboard", () => {
  beforeAll(async () => {
    setupTests();
  });
  beforeEach<LocalTestContext>(async (context) => {
    // typeof context is 'TestContext & LocalTestContext'
    context.buttonLabel = "Fetch Client";
    context.mockUser = mockUser;
  });

  test<LocalTestContext>("Button be defined", async (context) => {
    render(<Dashboard />);

    const button = await screen.findByText(context.buttonLabel);
    expect(button).toBeDefined();
  });

  test<LocalTestContext>("Fetch client if clicked on button", async (context) => {
    const wrapper = render(<Dashboard />);
    const button = wrapper.getByText(context.buttonLabel);
    await userEvent.click(button);

    const name = await wrapper.findByText(context.mockUser.name);
    expect(name).toBeDefined();
  });
});

const setupTests = () => {
  const mockRequestGetUser = createRestHandler(
    "get",
    `${routes.api.users}/${1}`,
    200,
    mockUser
  );

  const server = createMockServer(mockRequestGetUser);
  startMockServer(server);
};
