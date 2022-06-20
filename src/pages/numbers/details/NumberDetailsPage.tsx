import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCompanyContext } from "../../../hooks/use-company.hook";
import { formatCompanyNumber } from "../../../helpers";

import "../../../common/styles.css";
import Empty from "../../../components/empty/Empty";

const NumberPage = () => {
  const navigate = useNavigate();
  const { numberId } = useParams();

  const { company, companyNumbers } = useCompanyContext();

  const companyNumber = companyNumbers.find(({ id }) => id === numberId);

  useEffect(() => {
    if (company && companyNumber) {
      document.title = `${company.name} > Number ${formatCompanyNumber(
        companyNumber.id
      )}`;
    }
  }, []);

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>Go Back</button>

      {!companyNumber ? (
        <Empty />
      ) : (
        <>
          <p>{formatCompanyNumber(companyNumber.id)}</p>
          <p className="capitalize">{companyNumber.type}</p>
        </>
      )}
    </div>
  );
};

export default NumberPage;
