"use client";
import { useContext, useEffect } from "react";
import CardFAQ from "./components/CardFAQ/CardFAQ";
import Title from "./components/Title/Title";
import DataContext from "./contexts/DataContext";
import { FaqItem, GET } from "./api/faq/route";
import { AlertColor } from "@mui/material";

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
        let errorMessage = "Something went wrong, please try again later.";
        let severity: AlertColor = "error";

        setDataState({
          alertMessage: errorMessage,
          alertSeverity: severity,
          isAlertOpen: true
        });
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
