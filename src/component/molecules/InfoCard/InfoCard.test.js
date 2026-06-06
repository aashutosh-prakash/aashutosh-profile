import { render, screen } from "@testing-library/react";
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

  it("links to LinkedIn via an icon, opening safely in a new tab", () => {
    render(<InfoCard />);
    const linkedin = screen.getByRole("link", { name: /connect on linkedin/i });
    expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/aashutoshprakash/"
    );
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("links to X via an icon, opening safely in a new tab", () => {
    render(<InfoCard />);
    const x = screen.getByRole("link", { name: /find me on x/i });
    expect(x).toHaveAttribute("href", "https://x.com/Aashutosh_94");
    expect(x).toHaveAttribute("target", "_blank");
    expect(x).toHaveAttribute("rel", "noopener noreferrer");
  });
});
