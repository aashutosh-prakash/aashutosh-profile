import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders the content and calls the handler on click", async () => {
    const handler = jest.fn();
    render(<Button content="Let's Connect" type="button" handler={handler} />);

    await userEvent.click(screen.getByRole("button", { name: "Let's Connect" }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("applies the variant class and any extra classes", () => {
    render(
      <Button
        content="Pause"
        type="button"
        handler={jest.fn()}
        variant="game"
        addClasses="extra-class"
      />
    );
    const button = screen.getByRole("button", { name: "Pause" });
    expect(button.className).toContain("extra-class");
  });
});
