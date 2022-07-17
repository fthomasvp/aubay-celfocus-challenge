import { render } from "../../../utils/test-utils";

import LoadingIndicator from "../LoadingIndicator";

describe("LoadingIndicator", () => {
  it("should show an loading indicator", async () => {
    const { findByTestId } = render(<LoadingIndicator />);

    const loading = await findByTestId("loadingIndicator");
    expect(loading).toBeInTheDocument();
  });
});
