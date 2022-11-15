import React from "react";
import { describe, expect, test, beforeEach, beforeAll } from "vitest";

import {
  render,
  screen,
  userEvent,
  createMockServer,
  createRestHandler,
  startMockServer,
  waitFor,
} from "shared";
import App from "./App";

import { LocalTestContext } from "./interfaces";
import { UserStore } from "./store";
import { mockUser } from "./__test__/mocks";
import { routes } from "./routes";

describe("App", () => {
  beforeAll(async () => {
    setupTests();
  });
  beforeEach<LocalTestContext>(async (context) => {
    context.buttonLabel = "Login";
  });

  test<LocalTestContext>("If user is not logged in, page will be render Login view", async (context) => {
    const wrapper = render(<App />);
    const button = wrapper.getByText(context.buttonLabel);

    expect(button).toBeDefined();
    expect(screen.getByText(/welcome back!/i)).toBeDefined();
    expect(screen.getByText(/email/i)).toBeDefined();
    expect(screen.getByText(/password/i)).toBeDefined();
  });

  test<LocalTestContext>("In Login View, button to submit form should be disabled if inputs is empty", async (context) => {
    render(<App />);

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });

    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: /sign in/i,
    });

    expect(button).toBeDefined();
    expect(emailInput.nodeValue).toBeNull();
    expect(button.closest("button")).toHaveProperty("disabled");
  });
  test<LocalTestContext>("If mail input not in correctly format, error message should be in the Document and button still disabled", async (context) => {
    render(<App />);

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput =
      screen.getByPlaceholderText<HTMLTextAreaElement>(/your password/i);
    // use UserEvent to simulate user input
    await userEvent.type(emailInput, "erickwendel.com");
    await userEvent.type(passwordInput, "54545");
    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: /sign in/i,
    });

    expect(passwordInput.value).toBe("54545");
    expect(screen.getByText(/email must be a valid email/i)).toBeDefined();
    screen.logTestingPlaygroundURL();
    expect(button.disabled).toBeTruthy();
  });
  test<LocalTestContext>("If mail input correctly format, button should be changed to enabled", async (context) => {
    render(<App />);

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput =
      screen.getByPlaceholderText<HTMLTextAreaElement>(/your password/i);

    await userEvent.type(emailInput, "filipedeschamps@gmail.com");
    await userEvent.type(passwordInput, "tabnews");
    const button = await screen.findByRole<HTMLButtonElement>("button", {
      name: /sign in/i,
    });

    expect(button.disabled).toBeFalsy();
  });
  test<LocalTestContext>("If user fully correct inputs and press button, page will be redirect to dashboard", async (context) => {
    render(<App />);
    const user = userEvent.setup();
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput =
      screen.getByPlaceholderText<HTMLTextAreaElement>(/your password/i);

    await user.type(emailInput, "filipedeschamps@gmail.com");
    await user.type(passwordInput, "tabnews");
    const button = await screen.findByRole<HTMLButtonElement>("button", {
      name: /sign in/i,
    });

    expect(button.disabled).toBeFalsy();
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Shanna@melissa.tv/i)).toBeDefined();
      expect(screen.getByText(/Ervin Howell/i)).toBeDefined();
      expect(screen.getByRole("img")).toBeDefined();
    });
  });
  test<LocalTestContext>("If user is logged, page will be render dashboard view", async (context) => {
    UserStore.setUser(mockUser);
    const wrapper = render(<App />);
    const button = wrapper.getByRole("button", {
      name: /fetch client/i,
    });
    expect(button).toBeDefined();
    expect(screen.getByText(/sincere@april\.biz/i)).toBeDefined();
    expect(screen.getByText(/leanne graham/i)).toBeDefined();
    expect(screen.getByRole("img")).toBeDefined();
  });
});

const setupTests = () => {
  const mockRequestGetUser = createRestHandler(
    "get",
    `${routes.api.users}/22`,
    200,
    mockUser
  );

  const server = createMockServer(mockRequestGetUser);
  startMockServer(server);
};
