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
import { FaqItem } from "@/app/api/faq/route";
import { /* use, */ useContext } from "react";
import DataContext from "@/app/contexts/DataContext";

/* const dataPromise = GET(); */

const getSectionNumber = (level: number, index: number[]) => {
  return `${index.join(".")}${index.length > 0 ? "." : ""}${level}`;
};

export default function CardFAQ() {
  /* const getFaqs = use(dataPromise); */
  const { getFaqs } = useContext(DataContext);

  const hasChildren = (subSectionId: FaqItem) => {
    return getFaqs.some((faq: any) => faq.subSectionId === subSectionId);
  };

  const renderSubSections = (parentId: any, parentIndex: number[]) => {
    const subSections = getFaqs.filter((faq: any) => faq.subSectionId === parentId);

    return subSections.map((subSection: any, subIndex: number) => {
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
    const parents = getFaqs.filter((faq: any) => faq.subSectionId === null);

    return parents.map((parent: any, parentIndex: number) => {
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
    <Container maxWidth="lg" sx={{ mb: "50px" }}>
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
