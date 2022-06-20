import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
import { CompanyContextProvider } from "./contexts/company.context";

import AppRoutes from "./routes";

const App = () => {
  return (
    <ErrorBoundary>
      <CompanyContextProvider>
        <AppRoutes />
      </CompanyContextProvider>
    </ErrorBoundary>
  );
};

export default App;
