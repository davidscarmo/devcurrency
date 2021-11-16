import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { CurrencyCard } from "../components/CurrencyCard";
import { api } from "../services/api";
import styles from "../styles/Home.module.scss";
import { formatCurrency } from "../utils/fomatCurrency";

interface Currency {
  currencyCode: string;
  name: string;
  buy: number;
  symbol: string;
  variation: number;
}
interface CurrenciesCodes {
  currencyCode: string;
}
interface CurrenciesProps {
  currencies: Currency[];
  currenciesCodes: CurrenciesCodes[];
}

export default function Home(props: CurrenciesProps) {
  const [valueToConvert, setValueToConvert] = useState(null);
  const [convertedValue, setConvertedValue] = useState(null);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
  const { currencies, currenciesCodes } = props;
  console.log(currenciesCodes);
  const handleConvertCurrency = (event: FormEvent) => {
    event.preventDefault();
    const selectedCurrency = currencies.filter(
      (currency) => currency.currencyCode == selectedCurrencyCode
    );

    const value = valueToConvert * selectedCurrency[0].buy;
    setConvertedValue(value);
  };

  return (
    <>
      <Head>
        <title>Dev Currency</title>
      </Head>
      <div className={styles.container}>
        <div> {formatCurrency(convertedValue)}</div>
        <form onSubmit={handleConvertCurrency} className={styles.form}>
          <div className={styles.inputSelectArea}>
            <input
              type="number"
              value={valueToConvert > 0 ? valueToConvert : ""}
              onChange={(event) =>
                setValueToConvert(Number(event.target.value))
              }
            />

            <select
              value={selectedCurrencyCode}
              onChange={({ target }) => setSelectedCurrencyCode(target.value)}
              style={{ textTransform: "capitalize" }}
            >
              <option value="" disabled>
                Selecione
              </option>
              {currenciesCodes.map((option) => {
                return (
                  <option key={option.currencyCode} value={option.currencyCode}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit">Converter</button>
        </form>

        <h2>Moedas disponíveis</h2>
        <div className={styles.cardArea}>
          {currencies.map((currency) => (
            <CurrencyCard key={currency.currencyCode} currency={currency} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get("/");
  const currenciesData = response.data.results.currencies;
  const currenciesConvertedData = Object.entries(currenciesData)
    .filter((currency) => currency[0] !== "source")
    .map((currency: any) => {
      return {
        currencyCode: currency[0] || null,
        name: currency[1].name || null,
        buy: currency[1].buy || null,
        symbol: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: currency[0],
        }).formatToParts()[0].value,
        variation: currency[1].variation || 0,
      };
    });

  const currenciesCodes = currenciesConvertedData.map(
    (currency) => currency.currencyCode
  );
  return {
    props: {
      currencies: currenciesConvertedData,
      currenciesCodes: currenciesCodes,
    },
  };
};
