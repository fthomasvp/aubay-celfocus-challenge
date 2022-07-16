import { vi } from "vitest";

import { render } from "../../../utils/test-utils";
import { CompanyContext } from "../../../contexts/company.context";
import { mockCompanies } from "../../../mocks/companies/company.handlers";
import {
  Company,
  CompanyNumber,
} from "../../../features/companies/company.type";

import NumberDetailsPage from "./NumberDetailsPage";

describe("NumberDetailsPage", () => {
  const companyProviderProps = {
    value: {
      companies: [] as Company[],
      setCompanies: vi.fn(),
      company: null,
      setCompany: vi.fn(),
      companyNumbers: [] as CompanyNumber[],
      setCompanyNumbers: vi.fn(),
    },
  };

  it.todo("should show Company name and phone on page title");

  it("should show an empty message when number is not found", async () => {
    const { findByText } = render(
      <CompanyContext.Provider value={{ ...companyProviderProps.value }}>
        <NumberDetailsPage />
      </CompanyContext.Provider>
    );

    expect(await findByText("There is no data to display")).toBeInTheDocument();
  });

  it("should show a go back button", async () => {
    const { findByRole } = render(
      <CompanyContext.Provider value={{ ...companyProviderProps.value }}>
        <NumberDetailsPage />
      </CompanyContext.Provider>
    );

    const goBackButton = await findByRole("button", {
      name: "Go Back",
    });
    expect(goBackButton).toBeInTheDocument();
  });

  it.todo("should show company number and type details");
});
