import { formatCurrency } from "../../utils/fomatCurrency";
import styles from "./CurrencyConvertedCard.module.scss";

interface CurrencyConvertedCardProps {
  currencyCode?: string;
  name?: string;
  convertedValue?: number;
  symbol?: string;
}

export const CurrencyConvertedCard = ({
  currencyCode,
  name = '',
  convertedValue,
  symbol,
}: CurrencyConvertedCardProps) => {
  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.cardTitle}>Valor Convertido</h2>
      <div className={styles.cardValue}>{formatCurrency(convertedValue || 0)}</div>
      <div className={styles.cardCurrency}>{symbol} - {name}</div>
    </div>
  );
};
