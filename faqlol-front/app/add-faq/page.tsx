"use client";
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
import { Metadata } from "next";
import { VTextField } from "../components/Forms/VTextField";
import { useContext, useRef } from "react";
import { FormHandles } from "@unform/core";
import DataContext from "../contexts/DataContext";

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
  const { setDataState } = useContext(DataContext);

  const handleSubmit = async (data: IFormData) => {
    alert("ok");
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
                  name="add-section"
                  required
                  fullWidth
                  margin="normal"
                  id="outlined-text"
                  label="Add a section title"
                  onKeyDown={handleKeyDown}
                />
                <VTextField
                  name="select-section"
                  required
                  fullWidth
                  margin="normal"
                  id="outlined-select-currency"
                  select
                  label="Select a section"
                  value={" "}
                >
                  <MenuItem>OPA</MenuItem>
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
