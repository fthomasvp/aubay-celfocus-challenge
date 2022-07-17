import { vi } from "vitest";

import { render, screen, waitFor } from "../../../utils/test-utils";
import { CompanyContext } from "../../../contexts/company.context";
import { mockCompanies } from "../../../mocks/companies/company.handlers";
import {
  Company,
  CompanyNumber,
} from "../../../features/companies/company.type";

import CompaniesPage from "../CompaniesPage";

describe("CompaniesPage", () => {
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

  it("should show Companies on page title", async () => {
    render(
      <CompanyContext.Provider value={{ ...companyProviderProps.value }}>
        <CompaniesPage />
      </CompanyContext.Provider>
    );

    await waitFor(() => expect(document.title).toEqual("Companies"));
  });

  it("should show Companies heading", async () => {
    render(
      <CompanyContext.Provider value={{ ...companyProviderProps.value }}>
        <CompaniesPage />
      </CompanyContext.Provider>
    );

    const companiesHeading = await screen.findByRole("heading", {
      level: 1,
      name: "Companies",
    });
    expect(companiesHeading).toBeInTheDocument();
  });

  it("should show empty message when companies are not found", async () => {
    render(
      <CompanyContext.Provider value={{ ...companyProviderProps.value }}>
        <CompaniesPage />
      </CompanyContext.Provider>
    );

    expect(
      await screen.findByText("There is no data to display")
    ).toBeInTheDocument();
  });

  it("should show company table", async () => {
    const localCompanyProviderProps = companyProviderProps;

    const { rerender } = render(
      <CompanyContext.Provider value={{ ...localCompanyProviderProps.value }}>
        <CompaniesPage />
      </CompanyContext.Provider>
    );

    rerender(
      <CompanyContext.Provider
        value={{
          ...localCompanyProviderProps.value,
          companies: mockCompanies.data,
        }}
      >
        <CompaniesPage />
      </CompanyContext.Provider>
    );

    const companiesTable = await screen.findByRole("table");
    expect(companiesTable).toBeInTheDocument();

    const companyNameColumn = await screen.findByText("Company name");
    expect(companyNameColumn).toBeInTheDocument();

    const vatinColumn = await screen.findByText("vatin");
    expect(vatinColumn).toBeInTheDocument();

    const tableRows = await screen.findAllByRole("row");
    tableRows.forEach((item) => {
      const companyNameElement = item.firstElementChild;
      const vatinElement = item.lastElementChild;

      // Skip table head row
      if (vatinElement?.innerHTML !== "vatin") {
        const aCompany = mockCompanies.data.find(
          ({ name }) => name === companyNameElement?.firstChild?.textContent
        );

        expect(companyNameElement?.firstChild).toHaveAttribute(
          "href",
          `/companies/${aCompany?.id}`
        );
        expect(vatinElement?.innerHTML).toBeTruthy();
      }
    });
  });
});
