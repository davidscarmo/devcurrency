export const formatCurrency = (currencyValue: number) => {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: 'BRL',
  }).format(currencyValue);
};
