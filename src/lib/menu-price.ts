const menuPriceFormatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const spiritPriceFormatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatMenuPrice(
  price: number | null | undefined,
  fractionDigits: 0 | 2 = 0,
): string | null {
  if (price == null) return null;
  return (
    fractionDigits === 2 ? spiritPriceFormatter : menuPriceFormatter
  ).format(price);
}
