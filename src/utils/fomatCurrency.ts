export const formatCurrency = (currencyValue: number, currencyCode: string) => {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: currencyCode,
  }).format(currencyValue);
};
