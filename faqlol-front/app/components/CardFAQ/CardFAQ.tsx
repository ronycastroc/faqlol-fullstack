"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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

const getSectionNumber = (level: number, index: number[]) => {
  return `${index.join(".")}${index.length > 0 ? "." : ""}${level}`;
};

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

  const renderSubSections = (parentId: any, parentIndex: number[]) => {
    const subSections = getFaqs.filter((faq) => faq.subSectionId === parentId);

    return subSections.map((subSection, subIndex) => {
      const subSectionIndex = [...parentIndex, subIndex + 1];
      const subSectionNumber = getSectionNumber(subIndex + 1, parentIndex);

      if (hasChildren(subSection.id)) {
        return (
          <Accordion key={subSection.id} sx={{ ml: "-15px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${subSection.id}-content`}
              id={`panel-${subSection.id}-header`}
            >
              <Typography>{`${subSectionNumber}. ${subSection.name}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderSubSections(subSection.id, subSectionIndex)}
            </AccordionDetails>
          </Accordion>
        );
      }

      return (
        <Typography sx={{ mt: "20px" }} key={subSection.id}>
          {`${subSectionNumber}. ${subSection.name}`}
        </Typography>
      );
    });
  };

  const renderAccordions = () => {
    const parents = getFaqs.filter((faq) => faq.subSectionId === null);

    return parents.map((parent, parentIndex) => {
      const parentSectionNumber = getSectionNumber(parentIndex + 1, []);

      return (
        <Accordion key={parent.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${parent.id}-content`}
            id={`panel-${parent.id}-header`}
          >
            <Typography variant="h4">{`${parentSectionNumber}. ${parent.name}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {renderSubSections(parent.id, [parentIndex + 1])}
          </AccordionDetails>
        </Accordion>
      );
    });
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
