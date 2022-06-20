export type Company = {
  id: number;
  name: string;
  vatin: string;
};

export type CompanyNumber = {
  id: string;
  type: string;
  company_id: number;
};
