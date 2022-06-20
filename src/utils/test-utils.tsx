import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    ...options,
  });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };
