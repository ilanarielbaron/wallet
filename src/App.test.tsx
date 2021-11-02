import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders challenge", () => {
  render(<App />);
  const linkElement = screen.getByText(/MARKETPLACE/i);
  expect(linkElement).toBeInTheDocument();
});
