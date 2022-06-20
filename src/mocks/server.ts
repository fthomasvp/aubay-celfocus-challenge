import { setupServer } from "msw/node";

import { companyHandlers } from "./companies/company.handlers";

export const server = setupServer(...companyHandlers);
