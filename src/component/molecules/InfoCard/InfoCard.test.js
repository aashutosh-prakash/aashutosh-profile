import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InfoCard from "./InfoCard";

describe("InfoCard", () => {
  it("renders the name and the AI-focused description", () => {
    render(<InfoCard />);
    expect(
      screen.getByRole("heading", { name: "Aashutosh Prakash" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/specialized in AI Front-End Transformation/i)
    ).toBeInTheDocument();
  });

  it("links the DEVELOPER easter egg to the game route as an internal link", () => {
    render(<InfoCard />);
    const developer = screen.getByRole("link", { name: "DEVELOPER" });
    expect(developer).toHaveAttribute("href", "/game");
    expect(developer).not.toHaveAttribute("target");
    expect(developer).not.toHaveAttribute("rel");
  });

  it("links to X, opening safely in a new tab", () => {
    render(<InfoCard />);
    const x = screen.getByRole("link", { name: /find me on/i });
    expect(x).toHaveAttribute("href", "https://x.com/Aashutosh_94");
    expect(x).toHaveAttribute("target", "_blank");
    expect(x).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("'Let's Connect' navigates to the LinkedIn profile", async () => {
    const hrefSetter = jest.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        set href(value) {
          hrefSetter(value);
        },
      },
    });

    render(<InfoCard />);
    await userEvent.click(
      screen.getByRole("button", { name: "Let's Connect" })
    );
    expect(hrefSetter).toHaveBeenCalledWith(
      "https://www.linkedin.com/in/aashutoshprakash/"
    );
  });
});
