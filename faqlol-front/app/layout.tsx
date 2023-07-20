"use client";
import { Card, CssBaseline, ThemeProvider, styled } from "@mui/material";
import { Inter } from "next/font/google";
import { themeCreator } from "@/src/theme/base";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${theme.spacing(15)};
  margin-bottom: ${theme.spacing(5)};
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
          <HeaderWrapper>
            <Image
              src="/../public/lol-league-of-Legends-logo.png"
              alt="league-of-Legends-logo"
              width={250}
              height={100}
            />
          </HeaderWrapper>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
