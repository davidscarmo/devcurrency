import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { api } from "../services/api";
import styles from "../styles/Home.module.css";

interface Currency {
  currencyCode: string;
  name: string;
  buy: number;
  symbol: string;
  variation: number;
}
interface CurrenciesProps {
  currencies: Currency[];
}

export default function Home(props: CurrenciesProps) {
  const [valueToConvert, setValueToConvert] = useState(null);
  const [convertedValue, setConvertedValue] = useState(null);
  const handleConvertCurrency = (event: FormEvent) => {
    event.preventDefault();
    const value = valueToConvert * props.currencies[0].buy;
    setConvertedValue(value);
  };

  return (
    <>
      <Head>
        <title>Dev Currency</title>
      </Head>
      <div>Hello there!</div>
      <form onSubmit={handleConvertCurrency}>
        <input
          type="number"
          value={valueToConvert > 0 ? valueToConvert : ''}
          onChange={(event) => setValueToConvert(Number(event.target.value))}
        />
        <button type="submit">Converter</button>
      </form>
      {convertedValue}
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
  return {
    props: {
      currencies: currenciesConvertedData,
    },
  };
};
