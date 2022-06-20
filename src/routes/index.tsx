import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoadingIndicator from "../components/loading-indicator/LoadingIndicator";

const CompaniesRoute = lazy(() => import("./CompaniesRoute"));
const NumbersRoute = lazy(() => import("./NumbersRoute"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingIndicator />}>
        <Routes>
          <Route path="/" element={<Navigate to="companies" replace />} />

          <Route path="companies/*" element={<CompaniesRoute />} />
          <Route path="numbers/*" element={<NumbersRoute />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
