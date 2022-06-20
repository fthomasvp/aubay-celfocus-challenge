import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Company,
  CompanyNumber,
} from "../../../features/companies/company.type";
import {
  getCompanyByIdService,
  getNumbersByCompanyIdService,
} from "../../../features/companies/company.service";
import { useCompanyContext } from "../../../hooks/use-company.hook";
import { formatCompanyNumber } from "../../../helpers";

import Empty from "../../../components/empty/Empty";

import "../../../common/styles.css";

const CompanyPage = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();

  const { company, setCompany, companyNumbers, setCompanyNumbers } =
    useCompanyContext();

  const handleClickGoBack = () => {
    setCompanyNumbers([]);

    navigate(-1);
  };

  useEffect(() => {
    if (companyId && company?.id === Number(companyId)) {
      document.title = company.name;

      if (
        companyNumbers.length === 0 ||
        companyNumbers.find(
          ({ company_id }) => company_id !== Number(companyId)
        )
      ) {
        const fetchCompanyPhones = async () => {
          const responseNumbers = await getNumbersByCompanyIdService(companyId);

          if (responseNumbers.ok) {
            const data = (await responseNumbers.json()) as CompanyNumber[];

            setCompanyNumbers(data);
          }
        };
        fetchCompanyPhones();
      }

      return;
    }

    if (companyId) {
      const fetchCompanyAndPhones = async () => {
        const [responseCompany, responseNumbers] = await Promise.all([
          getCompanyByIdService(companyId),
          getNumbersByCompanyIdService(companyId),
        ]);

        if (responseCompany.ok) {
          const data = (await responseCompany.json()) as Company;

          document.title = data.name;

          setCompany(data);
        }

        if (responseNumbers.ok) {
          const data = (await responseNumbers.json()) as CompanyNumber[];

          setCompanyNumbers(data);
        }
      };
      fetchCompanyAndPhones();
    }
  }, [companyId]);

  return (
    <div className="container">
      <button onClick={handleClickGoBack}>Go Back</button>

      <h2>{company?.name}</h2>

      {companyNumbers.length === 0 ? (
        <Empty />
      ) : (
        <table>
          <thead>
            <tr>
              <td>Number</td>
              <td>Type</td>
            </tr>
          </thead>
          <tbody>
            {companyNumbers.map(({ id, type }) => (
              <tr key={id}>
                <td>
                  <Link to={`/numbers/${id}`}>{formatCompanyNumber(id)}</Link>
                </td>
                <td className="capitalize">{type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompanyPage;
