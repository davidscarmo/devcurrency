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
      <div>
        <span>{variation}</span>
      </div>
      <div>{formatCurrency(buy, currencyCode)}</div>
      <div className={styles.cardCurrencyName}>
        {symbol} - {name}
      </div>
    </div>
  );
};
