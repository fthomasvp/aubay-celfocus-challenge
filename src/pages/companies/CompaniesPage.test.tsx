import { vi } from "vitest";

import { render, waitFor } from "../../utils/test-utils";
import { CompanyContext } from "../../contexts/company.context";
import { mockCompanies } from "../../mocks/companies/company.handlers";

import CompaniesPage from "./CompaniesPage";

describe("CompaniesPage", () => {
  afterEach(async () => {
    await waitFor(() => expect(document.title).toEqual("Companies"));
  });

  const companyProviderProps = {
    value: {
      companies: [],
      setCompanies: vi.fn(),
      company: null,
      setCompany: vi.fn(),
      companyNumbers: [],
      setCompanyNumbers: vi.fn(),
    },
  };

  it("should show companies heading", async () => {
    const { findByRole } = render(
      <CompanyContext.Provider value={{ ...companyProviderProps.value }}>
        <CompaniesPage />
      </CompanyContext.Provider>
    );

    const companiesHeading = await findByRole("heading", {
      level: 1,
      name: "Companies",
    });
    expect(companiesHeading).toBeInTheDocument();
  });

  it("should show an empty message", async () => {
    const { findByText } = render(
      <CompanyContext.Provider value={{ ...companyProviderProps.value }}>
        <CompaniesPage />
      </CompanyContext.Provider>
    );

    expect(await findByText("There is no data to display")).toBeInTheDocument();
  });

  it("should show a list of companies", async () => {
    const { findByRole, findByText, findAllByRole } = render(
      <CompanyContext.Provider
        value={{ ...companyProviderProps.value, companies: mockCompanies }}
      >
        <CompaniesPage />
      </CompanyContext.Provider>
    );

    const companiesTable = await findByRole("table");
    expect(companiesTable).toBeInTheDocument();

    const companyNameColumn = await findByText("Company name");
    expect(companyNameColumn).toBeInTheDocument();

    const vatinColumn = await findByText("vatin");
    expect(vatinColumn).toBeInTheDocument();

    const tableRows = await findAllByRole("row");
    tableRows.forEach((item) => {
      const companyNameElement = item.firstElementChild;
      const vatinElement = item.lastElementChild;

      // Skip head row
      if (vatinElement?.innerHTML !== "vatin") {
        const aCompany = mockCompanies.find(
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
