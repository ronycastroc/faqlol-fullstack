"use client";
import {
  Card,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Tooltip,
  styled
} from "@mui/material";
import { Inter } from "next/font/google";
import { themeCreator } from "@/app/theme/base";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { DataProvider } from "./contexts/DataContext";
import CustomAlert from "./components/CustomAlert/CustomAlert";

const inter = Inter({ subsets: ["latin"] });

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${theme.spacing(15)};
  margin-bottom: ${theme.spacing(5)};
  background-color: ${theme.palette.background.default}`
);

const ButtonWrapper = styled("div")(
  ({ theme }) => `
  position: absolute;
  top: ${theme.spacing(2)};
  left: ${theme.spacing(1)};
  display: flex;
  flex-direction: row;
  align-items: center;`
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = themeCreator("DarkTheme");
  const router = useRouter();

  const handleHomeButtonClick = () => {
    router.push("/");
  };

  const handleAddButtonClick = () => {
    router.push("/add-faq");
  };

  const handleUpdateButtonClick = () => {
    router.push("/update-faq");
  };

  const handleDeleteButtonClick = () => {
    router.push("/");
  };

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <DataProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <HeaderWrapper>
              <Image
                src="/../public/lol-league-of-Legends-logo.png"
                alt="league-of-Legends-logo"
                width={250}
                height={100}
                priority
              />
              <ButtonWrapper>
                <Tooltip title="Home" arrow>
                  <IconButton color="primary" onClick={handleHomeButtonClick}>
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Section" arrow>
                  <IconButton color="primary" onClick={handleAddButtonClick}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Update Section" arrow>
                  <IconButton color="primary" onClick={handleUpdateButtonClick}>
                    <UpdateIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Section" arrow>
                  <IconButton color="primary" onClick={handleDeleteButtonClick}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ButtonWrapper>
            </HeaderWrapper>
            {children}
          </ThemeProvider>
          <CustomAlert />
        </DataProvider>
      </body>
    </html>
  );
}
