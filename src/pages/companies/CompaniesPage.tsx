import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Company } from "../../features/companies/company.type";
import { getCompaniesService } from "../../features/companies/company.service";
import { useCompanyContext } from "../../hooks/use-company.hook";

import Empty from "../../components/empty/Empty";

const CompaniesPage = () => {
  const { companies, setCompanies, setCompany } = useCompanyContext();

  const handleClickCompany = (companyId: number) => {
    const aCompany = companies.find(({ id }) => id === companyId);

    if (aCompany) {
      setCompany(aCompany);
    }
  };

  useEffect(() => {
    document.title = "Companies";

    if (companies.length === 0) {
      const fetchCompanies = async () => {
        try {
          const { data } = await getCompaniesService();

          setCompanies(data);
        } catch (error) {
          console.log("[CompaniesPage][fetchCompanies]", error);
        }
      };
      fetchCompanies();
    }
  }, []);

  return (
    <div style={{ marginLeft: "8px" }}>
      <h1>Companies</h1>

      {companies.length === 0 ? (
        <Empty />
      ) : (
        <table>
          <thead>
            <tr>
              <td>Company name</td>
              <td>vatin</td>
            </tr>
          </thead>
          <tbody>
            {companies.map(({ id, name, vatin }) => (
              <tr key={id}>
                <td>
                  <Link
                    to={`/companies/${id}`}
                    onClick={() => handleClickCompany(id)}
                  >
                    {name}
                  </Link>
                </td>
                <td>{vatin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompaniesPage;
