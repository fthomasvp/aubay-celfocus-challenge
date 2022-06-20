import { vi } from "vitest";

import { render } from "../../../utils/test-utils";
import { CompanyContext } from "../../../contexts/company.context";
import {
  mockCompanies,
  mockPhoneNumbers,
} from "../../../mocks/companies/company.handlers";

import CompanyDetailsPage from "./CompanyDetailsPage";

describe("CompanyDetailsPage", () => {
  const companyProviderProps = {
    value: {
      companies: mockCompanies,
      setCompanies: vi.fn(),
      company: null,
      setCompany: vi.fn(),
      companyNumbers: [],
      setCompanyNumbers: vi.fn(),
    },
  };
  const company = mockCompanies[1];

  it.todo("should show company name on page title");

  it("should show an empty message when company is not found", async () => {
    const { findByText } = render(
      <CompanyContext.Provider value={{ ...companyProviderProps.value }}>
        <CompanyDetailsPage />
      </CompanyContext.Provider>
    );

    expect(await findByText("There is no data to display")).toBeInTheDocument();
  });

  it("should show a go back button", async () => {
    const { findByRole } = render(
      <CompanyContext.Provider value={{ ...companyProviderProps.value }}>
        <CompanyDetailsPage />
      </CompanyContext.Provider>
    );

    const goBackButton = await findByRole("button", {
      name: "Go Back",
    });
    expect(goBackButton).toBeInTheDocument();
  });

  it("should show company name heading", async () => {
    const { findByRole } = render(
      <CompanyContext.Provider
        value={{ ...companyProviderProps.value, company }}
      >
        <CompanyDetailsPage />
      </CompanyContext.Provider>
    );

    const companiesHeading = await findByRole("heading", {
      level: 2,
      name: company.name,
    });
    expect(companiesHeading).toBeInTheDocument();
  });

  it("should show a list of company numbers", async () => {
    const { findByRole, findByText, findAllByRole } = render(
      <CompanyContext.Provider
        value={{
          ...companyProviderProps.value,
          company,
          companyNumbers: mockPhoneNumbers,
        }}
      >
        <CompanyDetailsPage />
      </CompanyContext.Provider>
    );

    const numbersTable = await findByRole("table");
    expect(numbersTable).toBeInTheDocument();

    const numberColumn = await findByText("Number");
    expect(numberColumn).toBeInTheDocument();

    const typeColumn = await findByText("Type");
    expect(typeColumn).toBeInTheDocument();

    const tableRows = await findAllByRole("row");
    tableRows.forEach((item) => {
      const numberElement = item.firstElementChild;
      const numberTypeElement = item.lastElementChild;

      // Skip head row
      if (numberTypeElement?.innerHTML !== "Type") {
        const originalNumber =
          numberElement?.firstChild?.textContent?.replaceAll(" ", "");

        expect(numberElement?.firstChild).toHaveAttribute(
          "href",
          `/numbers/${originalNumber}`
        );
        expect(numberTypeElement?.innerHTML).toBeTruthy();
      }
    });
  });
});
