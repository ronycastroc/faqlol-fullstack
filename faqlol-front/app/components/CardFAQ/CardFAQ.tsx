"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaqItem, GET } from "@/app/api/faq/route";
import { /* use, */ useEffect, useState } from "react";

/* const dataPromise = GET(); */

export default function CardFAQ() {
  /* const getFaqs = use(dataPromise); */
  const [getFaqs, setGetFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET();
        setGetFaqs(response as FaqItem[]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const hasChildren = (subSectionId: any) => {
    return getFaqs.some((faq) => faq.subSectionId === subSectionId);
  };

  const renderSubSections = (parentId: any) => {
    const subSections = getFaqs.filter((faq) => faq.subSectionId === parentId);

    return subSections.map((subSection) => {
      if (hasChildren(subSection.id)) {
        return (
          <Accordion key={subSection.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${subSection.id}-content`}
              id={`panel-${subSection.id}-header`}
            >
              <Typography>{subSection.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>{renderSubSections(subSection.id)}</AccordionDetails>
          </Accordion>
        );
      } else {
        return <Typography key={subSection.id}>{subSection.name}</Typography>;
      }
    });
  };

  const renderAccordions = () => {
    const parents = getFaqs.filter((faq) => faq.subSectionId === null);

    return parents.map((parent) => (
      <Accordion key={parent.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-${parent.id}-content`}
          id={`panel-${parent.id}-header`}
        >
          <Typography variant="h4">{parent.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>{renderSubSections(parent.id)}</AccordionDetails>
      </Accordion>
    ));
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <Card>
            <CardContent>{renderAccordions()}</CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
