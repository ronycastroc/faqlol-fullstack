"use client";
import { useContext, useEffect, useRef, useState } from "react";
import {
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
import { FormHandles } from "@unform/core";
import { useRouter } from "next/navigation";
import DataContext from "@/app/contexts/DataContext";
import { VTextField } from "@/app/components/Forms/VTextField";

const ButtonWrapper = styled("div")(
  () => `
  display: flex;
  flex-direction: column;
  align-items: center;
`
);

export default function UpdateFaq() {
  const formRef = useRef<FormHandles>(null);
  const [select, setSelect] = useState<string | null>(null);
  const [sectionText, setSectionText] = useState<string>("");
  const { getFaqs, setDataState } = useContext(DataContext);
  const route = useRouter();

  useEffect(() => {
    console.log(select);
    if (select !== null) {
      const selectedSection = getFaqs.find((faq: any) => faq.id === Number(select));
      if (selectedSection) {
        setSectionText(selectedSection.name);
      }
    }
  }, [select]);

  const handleSubmit = async (data: any) => {
    if (!data.selectSection) {
      setDataState({
        requiredTextError: true
      });
      return;
    }

    const selectedSection = getFaqs.find(
      (faq: any) => faq.id === Number(data.selectSection)
    );

    route.push("/");
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
            <CardHeader title="Update a section" subheader="Select a section to update" />
            <Divider />
            <Box p={5}>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <VTextField
                  name="selectSection"
                  required
                  fullWidth
                  margin="normal"
                  id="select-section"
                  select
                  label="Select a section"
                  value={select}
                  onChange={(e) => setSelect(e.target.value)}
                >
                  {getFaqs.map((faq: any, index: number) => (
                    <MenuItem key={index} value={String(faq.id)}>
                      {`${faq.id} - ${faq.name}`}
                    </MenuItem>
                  ))}
                </VTextField>
                {select && (
                  <VTextField
                    name="updateSection"
                    required
                    fullWidth
                    margin="normal"
                    id="update-section"
                    label="Update the selected section"
                    value={sectionText}
                  />
                )}
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
