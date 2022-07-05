import axios from "axios";

import { API_URL } from "../../constants";
import { Company, CompanyNumber } from "./company.type";

const axiosClient = axios.create({
  baseURL: API_URL,
});

/** Get list of companies. */
export const getCompaniesService = async () =>
  await axiosClient.get<Company[]>(`${API_URL}/companies`);

/** Get a specific company. */
export const getCompanyByIdService = async (companyId: string) =>
  await axiosClient.get<Company>(`${API_URL}/companies/${companyId}`);

/** Get list of company numbers. */
export const getNumbersByCompanyIdService = async (companyId: string) =>
  await axiosClient.get<CompanyNumber[]>(
    `${API_URL}/phone_numbers?company_id=${companyId}`
  );
