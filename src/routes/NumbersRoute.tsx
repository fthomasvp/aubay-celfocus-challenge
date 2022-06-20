import { Route, Routes } from "react-router-dom";

import NumberDetailsPage from "../pages/numbers/details/NumberDetailsPage";

const NumbersRoute = () => {
  return (
    <Routes>
      <Route path=":numberId" element={<NumberDetailsPage />} />
    </Routes>
  );
};

export default NumbersRoute;
