"use client";
import { useContext, useEffect } from "react";
import CardFAQ from "./components/CardFAQ/CardFAQ";
import Title from "./components/Title/Title";
import DataContext from "./contexts/DataContext";
import { FaqItem, GET } from "./api/faq/route";

export default function Home() {
  const { getFaqs, setDataState } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET();
        setDataState({
          getFaqs: response as FaqItem[]
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [getFaqs]);

  return (
    <>
      <Title />
      <CardFAQ />
    </>
  );
}
