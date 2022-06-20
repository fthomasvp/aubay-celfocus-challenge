/**
 * Add a space between the first three digits and the rest.
 * If no string is provide, an empty string will be returned.
 * @example "351910645123" will become "351 910645123"
 */
export const formatCompanyNumber = (companyNumber?: string) => {
  return companyNumber ? companyNumber.replace(/(\d{3})(\d{9})/, "$1 $2") : "";
};
