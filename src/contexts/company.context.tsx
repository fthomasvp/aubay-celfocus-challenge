import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Company, CompanyNumber } from "../features/companies/company.type";

export type CompanyContextType = {
  companies: Company[];
  setCompanies: Dispatch<SetStateAction<Company[]>>;
  company: Company | null;
  setCompany: Dispatch<SetStateAction<Company | null>>;
  companyNumbers: CompanyNumber[];
  setCompanyNumbers: Dispatch<SetStateAction<CompanyNumber[]>>;
};

export const CompanyContext = createContext<CompanyContextType>({
  companies: [],
  setCompanies: () => null,
  company: null,
  setCompany: () => null,
  companyNumbers: [],
  setCompanyNumbers: () => null,
});

export const CompanyContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [companyNumbers, setCompanyNumbers] = useState<CompanyNumber[]>([]);

  return (
    <CompanyContext.Provider
      value={{
        companies,
        setCompanies,
        company,
        setCompany,
        companyNumbers,
        setCompanyNumbers,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
