import { Route, Routes } from "react-router-dom";

import CompaniesPage from "../pages/companies/CompaniesPage";
import CompanyDetailsPage from "../pages/companies/details/CompanyDetailsPage";

const CompaniesRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<CompaniesPage />} />
      <Route path=":companyId" element={<CompanyDetailsPage />} />
    </Routes>
  );
};

export default CompaniesRoute;
