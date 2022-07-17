import { render } from "../../../utils/test-utils";

import Empty from "../Empty";

describe("Empty", () => {
  it("should show default description", async () => {
    const { findByText } = render(<Empty />);

    const description = await findByText("There is no data to display");
    expect(description).toBeInTheDocument();
  });

  it("should show custom description", async () => {
    const { findByText } = render(
      <Empty description="Some custom description" />
    );

    const description = await findByText("Some custom description");
    expect(description).toBeInTheDocument();
  });
});
