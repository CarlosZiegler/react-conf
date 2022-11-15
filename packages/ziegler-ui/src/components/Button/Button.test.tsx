import { describe, expect, test } from "vitest";
import { render, screen } from "shared";

import { Button } from "./Button";

describe("Button", () => {
  test("should show title all the time", () => {
    render(<Button onClick={(e) => console.log(e)} label={"Click Me React Conf!"} />);

    expect(screen.getByText(/Click Me/i)).toBeDefined();
  });
});
