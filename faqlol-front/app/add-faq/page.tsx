"use client";
import {
  AlertColor,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  MenuItem,
  styled
} from "@mui/material";
import { Form } from "@unform/web";
import { VTextField } from "../components/Forms/VTextField";
import { useContext, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import DataContext from "../contexts/DataContext";
import { FaqItem, POST } from "../api/faq/route";

export interface IFormData {
  name: string;
  subSectionId: string | null;
}

const ButtonWrapper = styled("div")(
  () => `
  display: flex;
  flex-direction: column;
  align-items: center;
`
);

export default function AddFaq() {
  const formRef = useRef<FormHandles>(null);
  const [section, setSection] = useState<string | null>(null);
  const { getFaqs, setDataState } = useContext(DataContext);

  const formatSectionsOptions = (sections: FaqItem[]) => {
    const options: { value: string; label: string }[] = [];
    const sectionCounts: { [key: string]: number } = {};

    const generateSectionNumbers = (sections: FaqItem[], parentNumber: string = "") => {
      const sortedSections = sections.sort((a, b) => a.id - b.id);

      sortedSections.forEach((section, index) => {
        const parentCount = sectionCounts[parentNumber] || 0;
        const sectionNumber =
          parentNumber === "" ? `${index + 1}` : `${parentNumber}.${index + 1}`;

        options.push({
          value: String(section.id),
          label: `${sectionNumber} - ${section.name}`
        });

        sectionCounts[sectionNumber] = 1;

        const subSections = getFaqs.filter(
          (faq: FaqItem) => faq.subSectionId === section.id
        );

        if (subSections.length > 0) {
          generateSectionNumbers(subSections, sectionNumber);
        }

        sectionCounts[parentNumber] = parentCount + 1;
      });
    };

    const parentSections = sections.filter((section) => section.subSectionId === null);

    generateSectionNumbers(parentSections);

    return options;
  };

  const handleSubmit = async (data: any) => {
    const { addSection, selectSection } = data;

    const body = {
      name: addSection,
      subSectionId: selectSection
    };

    try {
      await POST(body);

      formRef.current!.setFieldValue("addSection", "");
      formRef.current!.setFieldValue("selectSection", "");
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      formRef.current?.submitForm();
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Add a section"
              subheader="You can add a section or a subsection"
            />
            <Divider />
            <Box p={5}>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <VTextField
                  name="addSection"
                  required
                  fullWidth
                  margin="normal"
                  id="add-section"
                  label="Add a section title"
                  onKeyDown={handleKeyDown}
                />
                <VTextField
                  name="selectSection"
                  required
                  fullWidth
                  margin="normal"
                  id="select-section"
                  select
                  label="Select a section"
                  value={section !== null ? String(section) : ""}
                  onChange={(e) => setSection(e.target.value)}
                >
                  {formatSectionsOptions(getFaqs).map((option, index) => (
                    <MenuItem key={index} value={String(option.value)}>
                      {option.label}
                    </MenuItem>
                  ))}
                </VTextField>
              </Form>
              <ButtonWrapper>
                <Button
                  variant="contained"
                  sx={{ marginTop: "60px", width: "50%" }}
                  onClick={() => formRef.current?.submitForm()}
                >
                  DONE
                </Button>
              </ButtonWrapper>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}