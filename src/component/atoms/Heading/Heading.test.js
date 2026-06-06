import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading", () => {
  it("renders the content at the requested heading level", () => {
    render(<Heading content="Brain Feast" Type="h2" />);
    const heading = screen.getByRole("heading", { level: 2, name: "Brain Feast" });
    expect(heading.tagName).toBe("H2");
  });

  it("defaults to an h1", () => {
    render(<Heading content="Title" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Title");
  });
});
