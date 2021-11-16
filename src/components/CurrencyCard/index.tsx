import { formatCurrency } from "../../utils/fomatCurrency";
import styles from "./CurrencyCard.module.scss";

interface CurrencyCardProps {
  currency: {
    currencyCode: string;
    name: string;
    buy: number;
    symbol: string;
    variation: number;
  };
}

export const CurrencyCard = (props: CurrencyCardProps) => {
  const { buy, symbol, variation, currencyCode, name } = props.currency;
  return (
    <div className={styles.cardContainer}>
      <div
        className={`${styles.variation} ${
          variation >= 0 ? styles.variationUp : styles.variationDown
        }`}
      >
        <span>{variation}</span>
      </div>
      <div className={styles.currencyValue}>{formatCurrency(buy)}</div>
      <div className={styles.cardCurrencyName}>
        {symbol} - {name}
      </div>
    </div>
  );
};
