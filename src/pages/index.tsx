import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { api } from "../services/api";
import styles from "../styles/Home.module.css";


interface Currency {
  currencyCode: string;
  name: string;
  buy: string;
  variation: number;
}
interface CurrenciesProps {
  currencies: Currency[];
}

export default function Home(props: CurrenciesProps) {
  console.log(props.currencies[0].buy);
  return (
    <>
      <Head>
        <title>Dev Currency</title>
      </Head>
      <div>Hello there!</div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get("/");
  const currenciesData = response.data.results.currencies;
  const currenciesConvertedData = Object.entries(currenciesData)
    .map((currency: any) => {
      return {
        currencyCode: currency[0] || null,
        name: currency[1].name || null,
        buy: currency[1].buy || null,
        variation: currency[1].variation || 0,
      };
    })
    .filter((currency) => currency.currencyCode !== "source");

  return {
    props: {
      currencies: currenciesConvertedData,
    },
  };
};
