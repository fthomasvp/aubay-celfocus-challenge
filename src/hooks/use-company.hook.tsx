import { useContext } from "react";

import { CompanyContext } from "../contexts/company.context";

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);

  if (context === undefined) {
    throw new Error("Context was used outside of its Provider");
  }

  return context;
};
