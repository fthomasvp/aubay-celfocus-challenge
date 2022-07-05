import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
          try {
            const responseNumbers = await getNumbersByCompanyIdService(
              companyId
            );

            setCompanyNumbers(responseNumbers.data);
          } catch (error) {
            console.log("[CompanyPage][fetchCompanyPhones]", error);
          }
        };
        fetchCompanyPhones();
      }

      return;
    }

    if (companyId) {
      const fetchCompanyAndPhones = async () => {
        try {
          const [responseCompany, responseNumbers] = await Promise.all([
            getCompanyByIdService(companyId),
            getNumbersByCompanyIdService(companyId),
          ]);

          document.title = responseCompany.data.name;
          setCompany(responseCompany.data);

          setCompanyNumbers(responseNumbers.data);
        } catch (error) {
          console.log("[CompanyPage][fetchCompanyAndPhones]", error);
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
