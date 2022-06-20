import fetch from "cross-fetch";

import { API_URL } from "../../constants";

/** Get list of companies. */
export const getCompaniesService = async (): Promise<Response> =>
  await fetch(`${API_URL}/companies`);

/** Get a specific company. */
export const getCompanyByIdService = async (
  companyId: string
): Promise<Response> => await fetch(`${API_URL}/companies/${companyId}`);

/** Get list of company numbers. */
export const getNumbersByCompanyIdService = async (
  companyId: string
): Promise<Response> =>
  await fetch(`${API_URL}/phone_numbers?company_id=${companyId}`);
