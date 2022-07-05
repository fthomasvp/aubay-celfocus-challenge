import { rest } from "msw";

import { API_URL } from "../../constants";

export const mockCompanies = {
  data: [
    {
      id: 3,
      name: "Car Wash",
      vatin: "500754043",
    },
    {
      id: 4,
      name: "Engineering Company",
      vatin: "500754044",
    },
  ],
};

export const mockPhoneNumbers = [
  {
    id: "351210000008",
    type: "landline",
    company_id: 4,
  },
  {
    id: "351210000009",
    type: "landline",
    company_id: 4,
  },
];

export const companyHandlers = [
  rest.get(`${API_URL}/companies`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCompanies));
  }),

  rest.get(`${API_URL}/companies/:companyId`, (req, res, ctx) => {
    const { companyId } = req.params;
    const aCompany = mockCompanies.data.find(
      ({ id }) => id === Number(companyId)
    );

    return res(ctx.status(200), ctx.json(aCompany));
  }),

  rest.get(`${API_URL}/phone_numbers`, (req, res, ctx) => {
    const companyId = req.url.searchParams.get("company_id");
    const companyPhones = mockPhoneNumbers.filter(
      ({ company_id }) => company_id === Number(companyId)
    );

    return res(ctx.status(200), ctx.json(companyPhones));
  }),
];
