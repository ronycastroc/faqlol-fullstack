"use client";
import { Card, CssBaseline, ThemeProvider, styled } from "@mui/material";
import "./globals.css";
import { Inter } from "next/font/google";
import { themeCreator } from "@/src/theme/base";

const inter = Inter({ subsets: ["latin"] });

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${theme.spacing(12)};
  margin-bottom: ${theme.spacing(10)};
  background-color: ${theme.palette.background.default}
`
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = themeCreator("DarkTheme");

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <HeaderWrapper></HeaderWrapper>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
